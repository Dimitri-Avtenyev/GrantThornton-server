import React, {useState, useCallback} from 'react'
import {FileRejection, useDropzone} from 'react-dropzone'
import styles from "./UploadArea.module.css";
import Button from "@mui/material/Button"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ArticleIcon from '@mui/icons-material/Article';
import { ListItemText } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cache = createCache({
    key: "css",
    prepend: true
})


const UploadArea = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [rejected, setRejected] = useState<FileRejection[]>([]);

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

    const removeRejected = (name : string) => {
        setRejected(files => files.filter(({file}) => file.name !== name));
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if(!files.length) return;

        const formData = new FormData();
        files.forEach(file => formData.append("file", file));

        const URL = "http://localhost:3000/uploadfile"; //Moet process.env.URL worden
        const data = await fetch(URL, {
            method: "POST",
            body: formData
        });

        console.log(data);
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
                    <Button variant="contained" type="submit" className={styles.convertButton}>Convert</Button>
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
            </div>
        </CacheProvider>
    )
}

export default UploadArea