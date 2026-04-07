import { createContext, FC, useCallback, useContext, useState } from "react";
import { useChunkStore } from "../db/chunkStore";
import TcpSocket from 'react-native-tcp-socket';
import DeviceInfo from "react-native-device-info";
import { Alert, Platform } from "react-native";
import RNFS from 'react-native-fs';
import {v4 as uuidv4} from 'uuid';
import { produce } from "immer";
import { Buffer } from "buffer";
import 'react-native-get-random-values';
import { receiveChunkAck, receiveFileAck, sendChunkAck } from "./TCPUtils";


interface TCPContextType {
    server: any;
    clint: any;
    isConnected: boolean;
    connectedDevice: any;
    sentFiles: any;
    receivedFies: any;
    totalSentBytes: number;
    totalReceivedBytes: number;
    startServer: (port: number) => void;
    connectedToServer: (host: number, port: number, deviceName: string) => void;
    sendMessage: (message: string | Buffer) => void;
    sendFileAck: (file: any, type: 'file' | 'image') => void;
    disconnect: () => void;
}


const TCPContext = createContext<TCPContextType | undefined>(undefined)

export const useTCP = (): TCPContextType => {
    const context = useContext(TCPContext)
    if (!context) {
        throw new Error('useTCP must be used with in a TCPProvider')
    }
    return context
}

const options = {
    keystore: require('../../tls_certs/server-keystore.p12')
}


export const TCPProvider: FC<{children: React.ReactNode}> = ({ children }) => {

    const [server, setServer] = useState<any>(null);
    const [client, setClient] = useState<any>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [connectedDevice, setConnectedDevice] = useState<any>(null);
    const [sentFiles, setSentFiles] = useState<any>(null);
    const [receivedFiles, setReceivedFiles] = useState<any>(null);
    const [totalSentBytes, setTotalSentBytes] = useState<any>(null);
    const [totalReceivedBytes, setTotalReceivedBytes] = useState<any>(null);

    const { currentChunkSet, setCurrentChunkSet, setChunkStore } = useChunkStore();



    //disconnect 
    const disconnect = useCallback(() => {
        if (client) {
            client.destroy();
        }
        if (server) {
            server.close();
        }
        setReceivedFiles([]);
            setSentFiles([]);
            setCurrentChunkSet(null);
            setTotalReceivedBytes(0);
            setChunkStore(null);
            setIsConnected(false)
    }, [client, server]);


    //start the server

    const startServer = useCallback((port: number) => {
        if (server) {
            console.log('server alreafy running')
            return;

        }
        const newServer = TcpSocket.createTLSServer(options, (socket) => {
            console.log("clint connected", socket.address());
            setServerSocket(socket);
            socket.setNoDelay(true);

            socket.readableHighWaterMark = 1024 * 1224 * 1;
            socket.writableHighWaterMark = 1024 * 1224 * 1;

            socket.on('data', async (data) => {

                const parsedData = JSON.parse(data?.toString());
                if (parsedData?.event === 'connect') {
                    setIsConnected(true)
                    setConnectedDevice(parsedData?.deviceName)
                }

                if (parsedData.event === 'file_ack') {
                    receiveFileAck(parsedData?.file, socket, setReceivedFiles);
                }

                if (parsedData.event === 'send_chunk_ack') {
                    sendChunkAck(parsedData?.chunkNo, socket, setTotalSentBytes, setSentFiles);
                }

                if (parsedData.event === 'received_chunk_ack') {
                    receiveChunkAck(parsedData?.chunk, parsedData?.chunkNo, socket, setTotalReceivedBytes, generateFile,);
                }

            })

            socket.on('close', () => {
                console.log("Clint Disconnected");
                setReceivedFiles([]),
                    setSentFiles([]),
                    setCurrentChunkSet(null),
                    setTotalReceivedBytes(0),
                    setChunkStore(null),
                    setIsConnected(false)
                disconnect()
            })



            socket.on('error', (err) => console.error("socket error", err))

        })

        newServer.listen({ port, host: '0.0.0.0' }, () => {
            const address = newServer.address();
            console.log(`server running on ${address?.address}:${address?.port}}`);

        })

        newServer.on('error', (err) => console.error("Server Error", err))
        setServer(newServer)





    }, [server])

    //start client
    const connectToServer = useCallback(
        (host: string, port: number, deviceName: string) => {

            const newClient = TcpSocket.connectTLS(
                {
                    host,
                    port,
                    cert: true,
                    ca: require('../../tls_certs/server-cert.pem'),

                },
                () => {
                    setIsConnected(true);
                    setConnectedDevice(deviceName);
                    const myDeviceName = DeviceInfo.getDeviceNameSync();
                    newClient.write(
                        JSON.stringify({ event: 'connect', deviceName: myDeviceName }),
                    );
                },
            );

            newClient.setNoDelay(true);
            newClient.readableHighWaterMark = 1024 * 1024 * 1;
            newClient.writableHighWaterMark = 1024 * 1024 * 1;

            newClient.on('data', async data => {
                const parsedData = JSON.parse(data?.toString());
            
                if (parsedData.event === 'file_ack') {
                    receiveFileAck(parsedData?.file, socket, setReceivedFiles);
                }

                if (parsedData.event === 'send_chunk_ack') {
                    sendChunkAck(parsedData?.chunkNo, socket, setTotalSentBytes, setSentFiles);
                }

                if (parsedData.event === 'received_chunk_ack') {
                    receiveChunkAck(parsedData?.chunk, parsedData?.chunkNo, socket, setTotalReceivedBytes, generateFile,);
                }
            
            
            
            
            });

            newClient.on('close', () => {
                console.log('connection closed');
                setReceivedFiles([]),
                    setSentFiles([]),
                    setCurrentChunkSet(null),
                    setTotalReceivedBytes(0),
                    setChunkStore(null),
                    setIsConnected(false)
                disconnect()

            });

            newClient.on('error', err => {
                console.error('client error', err)
            });

            setClient(newClient);
        },
        [],
    );

//generate file

const generateFile = async ()=>{
    const {chunkStore, resetChunkStore}= useChunkStore.getState()
    if(!chunkStore){
        console.log("no chunk file to proceed")
        return
    }

    if(chunkStore?.totalChunks != chunkStore.chunkArray.length){
        console.error('not all the chunks have been received ');
        return;
    }

    try{

        const combinedChunks = Buffer.concat(chunkStore.chunkArray);
        const platformPath=
        Platform.OS == 'ios'
        ?`${RNFS.DocumentDirectoryPath}`
        :`${RNFS.DownloadDirectoryPath}`;
        const filePath = `${platformPath}/${chunkStore.name}`;

        await RNFS.writeFile(filePath, combinedChunks?.toString('base64'),'base64')
   
        setReceivedFiles((prevFiles:any)=>
            produce(prevFiles, ( draftFiles:any)=>{
                const fileIndex = draftFiles?.findIndex(
                    (f:any)=> f.td === chunkStore.id,
                );
                if(fileIndex !==  -1){
                    draftFiles[fileIndex]={
                        ...draftFiles[fileIndex],
                        uri:filePath,
                        available:true,
                    };
                }
            }),

        )


        console.log(' file saved successfully ', filePath)
        resetChunkStore()
    }catch(error){
        console.error('Error combining chunks or saving files ', error);
    }

}


//send message 

const sendMessage = useCallback((message:string, Buffer)=>{
    if(client){
        client.write(JSON.stringify(message))
        console.log('sent from clint', message);     
    }else if(server){
         serverSocket.write(JSON.stringify(message))
        console.log('sent from server', message);
    }else{
        console.log("no client or server available");
   
    }
    [client,server]
})


// send file ack 

const sendFileAck = async (file:any, type:'image'| 'file' )=>{
        if(currentChunkSet != null){
            Alert.alert("wait for the current file to be sent")
            return
        }
        const normalizedPath = Platform.OS ==='ios'?file?.uri?.replace('file://',""):file>uri
        const fileData = await RNFS.readFile(normalizedPath,'base64')
        const buffer = Buffer.from(fileData,'base64')
        const CHUNK_SIZE = 1024 *8;

        let totalChunks = 0;
        let offset = 0;
        let chunkArray =[];


        while (offset<buffer.length){
            const chunk = buffer.slice(offset,offset+ CHUNK_SIZE)
            totalChunks +=1;
            chunkArray.push (chunk);
            offset +=chunk.length
        }

        const rawData ={
            id:uuidv4(),
            name:type === 'file' ? file?.name :  file?.fileName,
            size:type === 'file' ? file?.size :  file?.fileSize,
            mimeType:type === 'file'? 'file': '.jpg',
            totalChunks
        };

        setCurrentChunkSet({
            id:rawData?.id,
            chunkArray,
            totalChunks
        })


        setSentFiles((prevData:any)=>{
            produce(prevData, (draft:any)=>{
                draft.push({
                    ...rawData, 
                    uri: file?.uri
                })
            })
        })


        const socket = client || serverSocket;
        if (!socket) return;

        try{
            console.log("file acknowledge done");
            socket.write(JSON.stringify({event :'file_ack', file:rawData}))
            
        }catch(error){
            console.log('error sending files', error)
        }
    }



    return (
        <TCPContext.Provider
            value={{
                server,
                client,
                connectedDevice,
                sentFiles,
                receivedFiles,
                totalReceivedBytes,
                totalSentBytes,
                isConnected,
                startServer,
                connectToServer,
                disconnect,
                sendMessage,
                sendFileAck,
            }}>
            {children}
        </TCPContext.Provider>
    )
}