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
    const [notes, setNotes] = React.useState({0: {text: "hello", position: {x: 0, y: 0}}, 1: {text: "hello", position: {x: 0, y: 200}}, 2: {text: "hello", position: {x: 0, y: 400}}});
    const [clips, setClips] = React.useState({});
    const [files, setFiles] = React.useState({});
    const [annotations, setAnnotations] = React.useState({});

    const notesContext = {
        notes,
        upsertNote: (id, text, position) => setNotes({ ...notes, [id]: { text, position } }),
        deleteNote: (id) => setNotes(({ [id]: _, ...rest }) => rest)
    }
    const clipsContext = {
        clips,
        upsertClip: (id, fileId, span, position) => setClips({ ...clips, [id]: { fileId, span, position } }),
        deleteClip: (id) => setClips(({ [id]: _, ...rest }) => rest)
    }
    const filesContext = {
        files
    }
    const annotationsContext = {
        annotations
    }

    // function saveContext() {
    //     var axios = require('axios');
    //     var Readable = require('stream').Readable;
    //     var data = new Readable;
    //     data.push(JSON.stringify(notes));
    //     data.append('file', data);
    //     data.append('pinataOptions', '{"cidVersion": 1"}');
    //     data.append('pinataMetadata', '{"name": "MyFile", "keyvalues": {"company": "Pinata"}}');

    //     var config = {
    //         method: 'post',
    //         url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS', 
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4MmI2MjJmNi1lMDAyLTQzNzktYTZiMi0zYTJmMTZmZTc0ODIiLCJlbWFpbCI6ImFmcmV2ZXJ0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJkN2I3MWExODg5NDU2NDE0NmY5NiIsInNjb3BlZEtleVNlY3JldCI6ImQ2ZWJlMDBjNTQwMjViZmZkMTlhOGUxYTQyZGZjY2FjZjk0MmZjZjAxNGJiMDU4MmUxMjY2Mjk5MzFmNDJiMTgiLCJpYXQiOjE2NTg1OTczODN9.id8CavzoeQbXoV8HZApAsrrw1rJLUO2SKJ-Ki9C7KZs'
    //         },
    //         data: notesJson
    //     };

    //     axios(config);
    // }

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