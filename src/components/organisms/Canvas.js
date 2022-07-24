import { NotesContext } from "./CanvasDataModel";
import Note from "../atoms/Note";

export default function Canvas() {
    return (
        <NotesContext.Consumer>
            {({ notes, upsertNote, deleteNote }) => (
                <>
                    <button onClick={() => upsertNote(3, "hello", { x: 0, y: 0 })}>
                        add note
                    </button>
                    <button onClick={() => deleteNote(3)}>
                        del note
                    </button>
                    <ul>
                        {Object.entries(notes)
                            .map(([id, { text, position: { x, y } }]) => (
                                <li key={id}>
                                    {`${text}: ${x}, ${y}`}
                                </li>
                            ))}
                    </ul>
                    <div>
                        <Note
                            position={{ x: 0, y: 0 }}
                            onSave={(text) => upsertNote(3, text, notes[3].position)}
                            onStop={(position) => upsertNote(3, notes[3].text, position)}>
                        </Note>
                    </div>
                </>
            )}
        </NotesContext.Consumer>
    );
}