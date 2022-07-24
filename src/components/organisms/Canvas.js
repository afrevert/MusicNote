import React from "react";
import { ClipsContext, NotesContext } from "./CanvasDataModel";
import Note from "../atoms/Note";
import AudioPlayer from "../atoms/audioplayer/AudioPlayer";

export default function Canvas() {
    const [inp, setInput] = React.useState("");
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
                            <form onSubmit={() => upsertNote(9, inp, { x: 0, y: 0 })}>
                                <label>
                                    <input type="text" value={inp} onChange={e => setInput(e.target.value)} />
                                </label>
                                <input type="submit" value="Submit" />
                            </form>
                        </>
                    )}

                </ClipsContext.Consumer>
            )}
        </NotesContext.Consumer>
    );
}