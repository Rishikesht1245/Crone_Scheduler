import ReactModal from "react-modal";

const Modal = ({ isOpen, children, heading }) => {
  // binding the modal to the app
  ReactModal.setAppElement("#root");

  const modalCustomStyles = {
    display: "flex",
    flexDirection: "column",
    borderRadius: "8px",
    justifyContent: "center",
    zIndex: 10,
    margin: "auto",
    padding: "25px",
    background: "white",
    maxHeight: "90%",
    minHeight: "30%",
  };

  return (
    <ReactModal
      closeTimeoutMS={500}
      className="w-full lg:w-2/4 xl:w-1/3 items-center justify-center focus:outline-none gap-3"
      isOpen={isOpen}
      style={{
        overlay: {
          zIndex: 10,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
        },
        content: modalCustomStyles,
      }}
      contentLabel="Example Modal"
      bodyOpenClassName={"ReactModal__Body--open"}
      htmlOpenClassName={"ReactModal__Html--open"}
      ariaHideApp={
        true
        /* Boolean indicating if the appElement should be hidden */
      }
      shouldFocusAfterRender={true}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      shouldReturnFocusAfterClose={
        true
        /* Boolean indicating if the modal should restore focus to the element
       that had focus prior to its display. */
      }
      role={"dialog"}
      preventScroll={true}
      parentSelector={() => document.body}
      aria={{ labelledby: "heading", describedby: "full_description" }}
      overlayElement={
        (props, contentElement) => <div {...props}>{contentElement}</div>
        /* Custom Overlay element. */
      }
      contentElement={
        (props, children) => <div {...props}>{children}</div>
        /* Custom Content element. */
      }
    >
      {/* heading and close button */}
      <div className="flex w-full relative">
        <h1>{heading}</h1>
      </div>
      {/* content */}
      <div className="w-full overflow-y-auto">{children}</div>
    </ReactModal>
  );
};
export default Modal;
