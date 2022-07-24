import React from "react";
import { ClipsContext, NotesContext } from "./CanvasDataModel";
import Note from "../atoms/Note";
import AudioPlayer from "../atoms/audioplayer/AudioPlayer";

export default function Canvas() {
    return (
        <NotesContext.Consumer>
            {({ notes, upsertNote, deleteNote }) => (
                <ClipsContext.Consumer>
                    {({ clips, upsertClip, deleteClip }) => (
                        <>
                            <ul>
                                {Object.entries(notes)
                                    .map(([id, { text, position: { x, y } }]) => (
                                        <li key={id}>
                                            {`${text}: ${x}, ${y}`}
                                        </li>
                                    ))}
                            </ul>
                            <ul>
                                {Object.entries(clips)
                                    .map(([id, { fileId, span, position: { x, y } }]) => (
                                        <li key={id}>
                                            {`${fileId}: ${x}, ${y}`}
                                        </li>
                                    ))}
                            </ul>
                            <TextSubmission 
                                onSubmit={text => upsertNote(randInt(), text, { x: 0, y: 0 })}
                                clearOnSubmit>
                            </TextSubmission>
                            <div>
                                {Object.entries(notes)
                                    .map(([id, { text, position }]) => (
                                        <Note
                                            text={text}
                                            position={position}
                                            onSave={(text) => {
                                                if (text) {
                                                    upsertNote(id, text, notes[id].position)
                                                } else {
                                                    deleteNote(id)
                                                }
                                            }}
                                            onStop={(position) => upsertNote(id, notes[id].text, position)}
                                            key={id}>
                                        </Note>
                                    ))}
                                {Object.entries(clips)
                                    .map(([id, { fileId, span, position }]) => (
                                        <AudioPlayer
                                            url={fileId}
                                            span={span}
                                            position={position}
                                            onCrop={span => upsertClip(id, clips[id].fileId, span, clips[id].position)}
                                            onStop={position => upsertClip(id, clips[id].fileId, clips[id].span, position)}
                                            key={id}>
                                        </AudioPlayer>
                                    ))}
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