import { Buffer } from "buffer";
import { create } from "zustand";

interface ChunkState {

    chunkStore:{
        id:string |null;
        name:string;
        totalChunks:number;
        chunkArray:Buffer[];
    }| null;
    currentChunkSet:{
        id:string |null;
        name:string;
        totalChunks:number;
        chunkArray:Buffer[];
    }| null;

        setChunkStore:(chunkstore:any)=>void;
        resetChunkStore:(chunkstore:any)=>void;
        setCurrentChunkSet:(chunkChunkSet:any)=>void;
        resetCurrentChunkSet:(chunkstore:any)=>void;
}


export const useChunkStore = create<ChunkState>(set=>({
    chunkStore:null,
    currentChunkSet:null,
    setChunkStore: chunkStore =>set(()=>({chunkStore})),
    resetChunkStore : () set (()=>({chunkStore:null})),
    setCurrentChunkSet: currentChunkSet => set (()=>({currentChunkSet})),
    resetCurrentChunkSet: ()=> set(()=>({currentChunkSet:null}))
}));