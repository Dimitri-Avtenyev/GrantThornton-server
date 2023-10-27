import styles from "./DownloadConfirmation.module.css"
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';

const DownloadConfirmation = () => {
    return (
        <div className={styles.DownloadConfirmationContainer}>
            <DownloadDoneIcon className={styles.downloadIcon}></DownloadDoneIcon>
            <p>Download done!</p>
        </div>
    )
}

export default DownloadConfirmation;
