import styles from "./DownloadButton.module.css";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import DownloadIcon from '@mui/icons-material/Download';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';


const cache = createCache({
    key: "css",
    prepend: true
})

const DownloadButton = () => {
    return (
        <CacheProvider value={cache}>
            <div>
                <Button href="#" component={Link} download="#" variant="contained" className={styles.downloadButton}>
                    <DownloadIcon></DownloadIcon>
                    Download files
                </Button>
            </div>
        </CacheProvider>
    )
}

export default DownloadButton;