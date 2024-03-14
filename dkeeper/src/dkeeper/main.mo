import List "mo:base/List";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";


actor DKeeper {
  public type Note ={
    title: Text;
    content: Text;
  };

  stable var notes: List.List<Note> =List.nil<Note>();

  public func createNote( titleText:Text, contentText :Text){

    let newNote: Note ={
      title = titleText;
      content = contentText;
    };

    notes := List.push(newNote, notes);
    Debug.print(debug_show(notes))
  };

  public query func readNotes(): async [Note]{
    let appendedList = List.toArray(notes);
  };

// there is not existent method to do so, in this case we will use 3 methods: take (keeps the n first elements fro the beginning), 
// take (keeps n elements from the end), append (puts 2 arrays together)
  public func removeNote(id: Nat){
    let listFirstPart = List.take(notes,id);
    let listSecondPart = List.drop(notes, id + 1);
    notes := List.append(listFirstPart, listSecondPart);
  };

}