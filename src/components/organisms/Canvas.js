import { NotesContext } from "./CanvasDataModel";
import Note from "../atoms/Note";

export default function Canvas() {
    return (
        <NotesContext.Consumer>
            {({ notes, upsertNote, deleteNote }) => (
                <>
                    <ul>
                        {Object.entries(notes)
                            .map(([id, { text, position: { x, y } }]) => (
                                <li key={id}>
                                    {`${text}: ${x}, ${y}`}
                                </li>
                            ))}
                    </ul>
                    <div>
                        {Object.entries(notes).map(([id, { text, position }]) => (
                            <Note
                                text={text}
                                position={position}
                                onSave={(text) => upsertNote(id, text, notes[id].position)}
                                onStop={(position) => upsertNote(id, notes[id].text, position)}
                                key={id}>
                            </Note>
                        ))}
                    </div>
                </>
            )}
        </NotesContext.Consumer>
    );
}