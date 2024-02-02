import { forwardRef } from "react";

interface ModalProps {
    children: React.ReactNode;
    title: string;
    onClose?: () => void;
}

const Modal = forwardRef<HTMLDialogElement, ModalProps>((props, ref) => {
    return (
        <dialog className="modal" ref={ref}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">{props.title}</h3>
                <div className="py-4 overflow-y-auto">
                    {props.children}
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>Cerrar</button>
            </form>
        </dialog>
    )
});

export default Modal;