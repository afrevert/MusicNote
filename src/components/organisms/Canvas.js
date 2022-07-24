import React from "react";
import { ClipsContext, NotesContext } from "./CanvasDataModel";
import Note from "../atoms/Note";
import AudioPlayer from "../atoms/audioplayer/AudioPlayer";
import { Fab } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import Modal from "../atoms/Modal"

export default function Canvas() {
    const [zIndex, setZIndex] = React.useState(1);
    const stackElem = (ref) => {
        ref.current.style.zIndex = zIndex;
        setZIndex((zIndex) => zIndex + 1);
    };
    const randTo = (n) => Math.floor(Math.random() * n);
    const colors = ["red", "green", "blue", "purple", "yellow"];
    return (
        <NotesContext.Consumer>
            {({ notes, upsertNote, deleteNote }) => (
                <ClipsContext.Consumer>
                    {({ clips, upsertClip, deleteClip }) => (
                        <>
                            <div>
                                {Object.entries(notes)
                                    .map(([id, { text, position, color }]) => (
                                        <Note
                                            className={"note-" + color}
                                            text={text}
                                            position={position}
                                            stackElem={stackElem}
                                            onSave={(text) => {
                                                if (text) {
                                                    upsertNote(id, text, notes[id].position, notes[id].color)
                                                } else {
                                                    deleteNote(id)
                                                }
                                            }}
                                            onStop={(position) => upsertNote(id, notes[id].text, position, notes[id].color)}
                                            key={id}>
                                        </Note>
                                    ))}
                                {Object.entries(clips)
                                    .map(([id, { fileId, span, position, color }]) => (
                                        <AudioPlayer
                                            className={"note-" + color}
                                            url={fileId}
                                            span={span}
                                            position={position}
                                            stackElem={stackElem}
                                            onCrop={span => upsertClip(id, clips[id].fileId, span, clips[id].position, clips[id].color)}
                                            onStop={position => upsertClip(id, clips[id].fileId, clips[id].span, position, clips[id].color)}
                                            key={id}>
                                        </AudioPlayer>
                                    ))}
                                <div style={{
                                    position: 'fixed',
                                    bottom: 16,
                                    right: 16,
                                }}>
                                    <Fab
                                        color="primary"
                                        aria-label="add"
                                        style={{
                                            
                                        }}
                                        onClick={() => upsertNote(randInt(), "", { x: 0, y: 0 }, colors[randTo(5)])}>
                                        <NoteAddIcon />
                                    </Fab>
                                    <Fab
                                        color="primary"
                                        aria-label="add"
                                        style={{
                                            marginLeft: '8px'
                                        }}
                                        onClick={() => {}}>
                                        <AudiotrackIcon />
                                    </Fab>
                                </div>
                            </div>
                        </>
                    )}

                </ClipsContext.Consumer>
            )}
        </NotesContext.Consumer>
    );
}

const TextSubmission = (props) => {
    const [inputValue, setInputValue] = React.useState("");
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            props.onSubmit(inputValue);
            if (props.clearOnSubmit) {
                setInputValue("");
            }
        }}>
            <label>
                <input
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}

const randInt = () => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);