import { Button, Modal } from "@nextui-org/react";
import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import style from "./card.module.css";
export default function ShareQuoteImageModal({
  visibleDownload,
  setVisibleDownload,
  quotes,
}: any) {
  const [windowSize, setWindowSize] = useState<any>(0);
  useEffect(() => {
    setWindowSize(window.innerWidth);
  }, [windowSize]);
  const [colorShareCard, setColorSharedCard] = useState("white");
  const [fontColorSharedCard, setFontColorSharedCard] = useState("black");
  const menuSelectColorSharedCard = ["#6050DC", "#E48400", "#CDE1F3"];
  const { author, content, tags } = quotes;

  const exportImage = async ({ share }: any) => {
    return html2canvas(document.getElementById(`${quotes._id}`)!).then(
      async (canvas) => {
        if (share) {
          const blob = await fetch(canvas.toDataURL()).then((r) => r.blob());

          const filesArray = [
            new File([blob], `${author}-${tags[0]}.png`, {
              type: "image/png",
            }),
          ];

          const data = {
            files: filesArray,
            url: "https://next-project-codigo-facilito.vercel.app/",
          };
          console.log(data, filesArray);

          if (navigator.canShare && navigator.canShare(data)) {
            await navigator.share(data);
          }
          return;
        }
        const link = document.createElement("a");

        link.download = `${author}-${tags[0]}.png`;

        link.href = canvas.toDataURL();
        link.click();
      }
    );
  };
  return (
    <Modal
      blur
      aria-labelledby="modal-title"
      open={visibleDownload}
      onClose={() => setVisibleDownload(false)}
    >
      <Modal.Body>
        <section
          style={{
            backgroundColor: colorShareCard,
            borderRadius: "20px",
          }}
        >
          <div
            id={quotes._id}
            style={{
              marginTop: "1rem",
              paddingTop: "0.5rem",
              backgroundColor: colorShareCard,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "1.5rem",
                fontWeight: "bold",
                margin: "15px",
                color: fontColorSharedCard,
              }}
            >
              {author}
            </div>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1.3rem",
                margin: "2rem",
                color: fontColorSharedCard,
              }}
            >
              {content}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                margin: "1rem",
                padding: "1rem",
                fontFamily: "cursive",
                color: fontColorSharedCard,
              }}
            >
              YouReadIt?
            </div>
          </div>
        </section>
      </Modal.Body>
      <section style={{ display: "flex", justifyContent: "space-evenly" }}>
        {menuSelectColorSharedCard.map((color, index) => {
          return (
            <button
              key={index}
              style={{
                borderRadius: 50,
                width: "2rem",
                height: "2rem",
                backgroundColor: `${color}`,
                border: "none",

                cursor: "pointer",
              }}
              onClick={() => setColorSharedCard(color)}
            />
          );
        })}
        <input
          className={style.inputColor}
          type="color"
          onChange={(event) => {
            setColorSharedCard(event.target.value);
          }}
        />
        <button
          style={{
            borderRadius: 5,
            width: "2rem",
            height: "2rem",
            backgroundColor: "white",
            border: "none",

            cursor: "pointer",
            color: "black",
            fontWeight: "bold",
            fontFamily: "cursive",
            fontSize: "20px",
          }}
          onClick={() => setFontColorSharedCard("black")}
        >
          A
        </button>
        <button
          style={{
            borderRadius: 5,
            width: "2rem",
            height: "2rem",
            backgroundColor: "black",
            border: "none",

            cursor: "pointer",
            color: "white",
            fontWeight: "bold",
            fontFamily: "cursive",
            fontSize: "20px",
          }}
          onClick={() => setFontColorSharedCard("white")}
        >
          A
        </button>
      </section>
      <Modal.Footer>
        <Button
          auto
          flat
          color="error"
          onPress={() => setVisibleDownload(false)}
        >
          Close
        </Button>
        {windowSize > 960 ? (
          <Button
            auto
            color="secondary"
            onPress={() => {
              setVisibleDownload(false);
              exportImage({ share: null });
            }}
          >
            Download
          </Button>
        ) : (
          <Button
            auto
            color="secondary"
            onPress={() => {
              setVisibleDownload(false);
              exportImage({ share: true });
            }}
          >
            Share
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
