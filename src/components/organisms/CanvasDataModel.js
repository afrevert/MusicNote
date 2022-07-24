import React from 'react'
import Canvas from './Canvas';

export const NotesContext = React.createContext({
    notes: {},
    upsertNote: () => { },
    deleteNote: () => { }
});
export const ClipsContext = React.createContext({
    clips: {},
    upsertClip: () => { },
    deleteClip: () => { }
});
export const FilesContext = React.createContext({
    files: {}
});
export const AnnotationsContext = React.createContext({
    annotations: {}
});

export default function CanvasDataModel() {
    const [notes, setNotes] = React.useState({0: {text: "hello", position: {x: 0, y: 0}, color: "red"}, 1: {text: "hello", position: {x: 0, y: 200}, color: "green"}, 2: {text: "hello", position: {x: 0, y: 400}, color: "blue"}});
    const [clips, setClips] = React.useState({10: {fileId: "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3", span: {start: 0, end: 100}, position: {x: 0, y: 0}, color: "purple"}});
    const [files, setFiles] = React.useState({});
    const [annotations, setAnnotations] = React.useState({});

    const notesContext = {
        notes,
        upsertNote: (id, text, position, color) => setNotes({ ...notes, [id]: { text, position, color} }),
        deleteNote: (id) => setNotes(({ [id]: _, ...rest }) => rest)
    }
    const clipsContext = {
        clips,
        upsertClip: (id, fileId, span, position, color) => setClips({ ...clips, [id]: { fileId, span, position, color } }),
        deleteClip: (id) => setClips(({ [id]: _, ...rest }) => rest)
    }
    const filesContext = {
        files
    }
    const annotationsContext = {
        annotations
    }

    function onSave() {
        var axios = require('axios');
        var data = JSON.stringify({
            "pinataOptions": {"cidVersion": 1
            },
            "pinataMetadata": {
                "name": "test_upload",
                "keyvalues": {
                    "type": "test"
                }
            },
            "pinataContent": {
                "notes": notes
            }
        });
        console.log(data);
    
        var config = {
            method: 'post',
            url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4MmI2MjJmNi1lMDAyLTQzNzktYTZiMi0zYTJmMTZmZTc0ODIiLCJlbWFpbCI6ImFmcmV2ZXJ0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJkN2I3MWExODg5NDU2NDE0NmY5NiIsInNjb3BlZEtleVNlY3JldCI6ImQ2ZWJlMDBjNTQwMjViZmZkMTlhOGUxYTQyZGZjY2FjZjk0MmZjZjAxNGJiMDU4MmUxMjY2Mjk5MzFmNDJiMTgiLCJpYXQiOjE2NTg1OTczODN9.id8CavzoeQbXoV8HZApAsrrw1rJLUO2SKJ-Ki9C7KZs'
            },
            data: data
        };
    
        console.log(axios(config));
    }

    return (
        <NotesContext.Provider value={notesContext}>
            <ClipsContext.Provider value={clipsContext}>
                <FilesContext.Provider value={filesContext}>
                    <AnnotationsContext.Provider value={annotationsContext}>
                        <Canvas></Canvas>
                    </AnnotationsContext.Provider>
                </FilesContext.Provider>
            </ClipsContext.Provider>
        </NotesContext.Provider>
    )
}