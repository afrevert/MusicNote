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
    const [notes, setNotes] = React.useState({});
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