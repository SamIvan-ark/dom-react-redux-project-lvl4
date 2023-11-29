import AddChannel from './AddChannelModal';
import RemoveChannel from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';

const modals = {
  adding: AddChannel,
  removing: RemoveChannel,
  renaming: RenameChannelModal,
};

export default (modalName) => modals[modalName];
