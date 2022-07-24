import React from "react";
import { NotesContext } from "./CanvasDataModel";
import Note from "../atoms/Note";
import AudioPlayer from "../atoms/audioplayer/AudioPlayer";

export default function Canvas() {
    const [inp, setInput] = React.useState("");
    return (
        <NotesContext.Consumer>
            {({ notes, upsertNote, deleteNote }) => (
                <>
                    <AudioPlayer url="http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3"></AudioPlayer>
                    <ul>
                        {Object.entries(notes)
                            .map(([id, { text, position: { x, y } }]) => (
                                <li key={id}>
                                    {`${text}: ${x}, ${y}`}
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
                    </div>
                    <form onSubmit={() => upsertNote(9, inp, {x: 0, y: 0})}>
                        <label>
                            <input type="text" value={inp} onChange={e => setInput(e.target.value)} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </>
            )}
        </NotesContext.Consumer>
    );
}