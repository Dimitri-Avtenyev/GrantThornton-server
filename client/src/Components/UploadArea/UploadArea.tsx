import React, {useState, useCallback} from 'react'
import {FileRejection, useDropzone} from 'react-dropzone'
import styles from "./UploadArea.module.css";
import { listenerCount } from 'process';


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
        <div className={styles.uploadArea}>
            <form onSubmit={handleSubmit}>
                <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag and drop your files here, or click to select files</p>
                }
                </div>
                <button type="submit" className={styles.convertButton}>Convert</button>
            </form>

            <ul>
                {files.map((file) => (
                    <div key={file.name} className={styles.fileList}>
                        <li>
                            {file.name}
                        </li>
                        <button onClick={() => removeFile(file.name)}>X</button>
                    </div>
                ))}
            </ul>

            {/*CODE TO SHOW ERRORS*/}
            {/* <ul> 
                {rejected.map(({file, errors}) => (
                    <div>
                        <li key={file.name}>{file.name}</li>
                        <ul>
                            {errors.map(error => (
                                <p key={error.code}>File must be Excel File</p>
                            ))}
                        </ul>
                        <button onClick={() => removeRejected(file.name)}>Remove</button>
                    </div>
                    
                ))}
            </ul> */}
        </div>
    )
}

export default UploadArea