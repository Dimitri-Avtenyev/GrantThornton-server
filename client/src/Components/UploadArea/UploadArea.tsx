import React, {useState, useCallback} from 'react'
import {FileRejection, useDropzone} from 'react-dropzone'
import styles from "./UploadArea.module.css";
import Button from "@mui/material/Button"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from "@mui/material/Link";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ArticleIcon from '@mui/icons-material/Article';
import { ListItemText } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import Box from "@mui/material/Box";


const cache = createCache({
    key: "css",
    prepend: true
})


const UploadArea = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [rejected, setRejected] = useState<FileRejection[]>([]);
    const [downloadlink, setDownloadLink] = useState<string>(""); // pas je zelf aan of verwijderen, eigen flow plaatsen

    const onDrop = useCallback((acceptedFiles : File[], rejectedFiles : FileRejection[]) => {
        if(acceptedFiles.length) {
            setFiles(previousFiles => [
                ...previousFiles,
                ...acceptedFiles
            ])
        }

        if(rejectedFiles.length) {
            setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
        }
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: {
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"]
    }})

    const removeFile = (name : string) => {
        setFiles(files => files.filter(file => file.name !== name));
    }

    // ----- CODE TO REMOVE REJECTED FILES -----
    // const removeRejected = (name : string) => {
    //     setRejected(files => files.filter(({file}) => file.name !== name));
    // }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if(!files.length) return;

        const formData = new FormData();
        files.forEach(file => formData.append("file", file));

        // -> send and receive xslx file as response <-
        // hier is ineens een "guideline" voor file als response
         // -> ---------------- receive file as res --------------------- <-
        try {
            const ENDPOINT = "http://localhost:3000/uploadfile"; //Moet process.env.URL worden
            const response = await fetch(ENDPOINT, {
                method: "POST",
                body: formData
            });
            if (response.status === 200) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setDownloadLink(url);
            }
        } catch (err) {
            console.log(err);
        }
        // -> ---------------- receive file as res --------------------- <- 
    }

    const boxDefault = {
        height: 100,
    }

    return (
        <CacheProvider value={cache}>
            
            <div className={styles.uploadArea}>
                <form onSubmit={handleSubmit}>
                    <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                        <Button className={styles.uploadButton} component="label" variant="contained">Drop the files here ...</Button> :
                        <Button className={styles.uploadButton} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                            Upload files
                        </Button>
                    }
                    </div>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={boxDefault}
                    >
                        <Button variant="contained" type="submit" className={styles.convertButton}>Convert</Button>
                    </Box>
                </form>
                <div className={styles.listContainer}>
                    <List className={styles.fileList}>
                        {files.map((file) => (
                            <ListItem className={styles.listItem} key={file.name}>
                                <ArticleIcon className={styles.articleIcon}></ArticleIcon>
                                <ListItemText className={styles.listItemText}>{file.name}</ListItemText>
                                <DeleteIcon className={styles.deleteIcon} onClick={() => removeFile(file.name)}>X</DeleteIcon>
                            </ListItem>
                        ))}
                    </List>

                    <List> 
                        {rejected.map(({file, errors}) => (
                            <ListItem key={file.name}>
                                <ListItemText>{file.name}</ListItemText>
                                <List>
                                    {errors.map(error => (
                                        <ListItemText className={styles.errorMessage} key={error.code}>File must be an Excel File!</ListItemText>
                                    ))}
                                </List>
                            </ListItem>
                            
                        ))}
                    </List>
                </div>
                <div>
                <Button href={downloadlink} component={Link} download={"demoProcessedFile.xlsx"} variant="contained" className={styles.downloadButton}>
                    <DownloadIcon></DownloadIcon>
                    Download files
                </Button>
                </div>
            </div>
            
        </CacheProvider>
    )
}

export default UploadArea