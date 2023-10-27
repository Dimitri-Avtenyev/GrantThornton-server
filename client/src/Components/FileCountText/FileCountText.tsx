import styles from "./FileCountText.module.css";

const FileCountText = () => {
    return (
        <div className={styles.fileCountTextContainer}>
            <p>Er werden X onbekende valuta gevonden. <br /> Klik op onderstaande knop om uw bestand te downloaden.</p>
        </div>
    )
}

export default FileCountText;