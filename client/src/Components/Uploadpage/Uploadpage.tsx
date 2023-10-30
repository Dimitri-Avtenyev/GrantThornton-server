import styles from "./Uploadpage.module.css";
import UploadArea from '../UploadArea/UploadArea';
import WelcomeText from "../WelcomeText/WelcomeText";
import FileCountText from "../FileCountText/FileCountText";
import DownloadConfirmation from "../DownloadConfirmation/DownloadConfirmation";

const Uploadpage= () =>{
    return (
        <main className={styles.main}>
            <WelcomeText/>
            <UploadArea/>
        </main>
    )
}
export default Uploadpage;