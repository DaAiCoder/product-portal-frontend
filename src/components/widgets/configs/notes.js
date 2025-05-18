import NotesWidget from '../NotesWidget';
import { FaStickyNote } from 'react-icons/fa';

const notes = {
  id: 'notes',
  label: 'Notes',
  icon: <FaStickyNote size={40} />,
  w: 4,
  h: 4,
  component: NotesWidget,
};

export default notes;
