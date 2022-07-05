import { useSelector } from 'react-redux';
import { IRootReducers } from '../../redux/rootReducer';

const ModalView = () => {
  const { isShowModal, content } = useSelector(
    (state: IRootReducers) => state.common,
  );
  return isShowModal ? (
    <div
      className="fixed inset-0 flex items-center justify-center bg-slate-100/50"
      aria-labelledby="modal-title"
      role={'dialog'}
      aria-modal="true"
    >
    {content}
    </div>
  ) : (
    <></>
  );
};

export default ModalView;
