import AltContainer from 'alt-container';
import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <button className="add-note" onClick={this.addNote}>+</button>
                <AltContainer
                    stores={[NoteStore]}
                    inject={{notes: () => NoteStore.getState().notes}}>
                <Notes onEdit={this.editNote} onDelete={this.deleteNote}/>
                </AltContainer>
            </div>
        );
    }

    deleteNote = (id, e) => {
        // Avoid bubbling to edit
        e.stopPropagation();

        NoteActions.delete(id);
    };

    // We are using an experimental feature known as property
    // initializer here. It allow us to bind the method 'this'
    // to point at our *App* instance
    //
    // Alternatively we could 'bind' at 'constructor' ussing
    // a line, such as this.addNote = this.addNote.bind(this);
    addNote = () => {
        // It would be possible to write this in an imperative style.
        // I.e., through 'this.state.note.push' and then
        // 'this.setState({notes: this.state.notes})' to commit.
        //
        // I tend to favor functional style whenever that make sense.
        // Even though it might take more code something, I feel
        // the benefits (easy to reason about, no side effects)
        // more than make up for it.
        //
        // Libraries, such as Immutable.js, go notch further
        NoteActions.create({task: 'New task'});
    };

    editNote = (id, task) => {
        // Don't modify if trying set an empty value
        if(!task.trim()){
            return;
        }

        NoteActions.update({id: task});
    }
}