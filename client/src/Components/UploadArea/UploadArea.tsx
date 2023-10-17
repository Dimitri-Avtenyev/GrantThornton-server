import React, {useState, useCallback} from 'react'
import {FileRejection, useDropzone} from 'react-dropzone'



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

        const URL = ""; //Moet process.env.URL worden
        const data = await fetch(URL, {
            method: "POST",
            body: formData
        }).then(res => res.json());

        console.log(data);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag and drop your files here, or click to select files</p>
                }
                </div>
            </form>

            <button>Convert currency</button>

            <ul>
                {files.map(file => (
                    <div>
                        <li key={file.name}>
                            {file.name}
                        </li>
                        <button onClick={() => removeFile(file.name)}></button>
                    </div>
                ))}
            </ul>

            <ul>
                {rejected.map(({file, errors}) => (
                    <div>
                        <li key={file.name}>{file.name}</li>
                        <ul>
                            {errors.map(error => (
                                <p key={error.code}>File must be Excel File</p>
                            ))}
                        </ul>
                        <button onClick={() => removeRejected(file.name)}></button>
                    </div>
                    
                ))}
            </ul>
        </div>
    )
}

export default UploadArea