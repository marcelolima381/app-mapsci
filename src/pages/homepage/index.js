import React, {useMemo} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {useMutation} from "react-query";
import ApiService from "../../common/services";
import {useDropzone} from 'react-dropzone';
import {acceptStyle, activeStyle, baseStyle, rejectStyle} from "./dropzone-style";

function HomePage() {
	const mutation = useMutation((lattesZIP) => ApiService.postLattes(lattesZIP), {
		onSuccess: () => {
			console.info('sucesso')
		},
		onError: () => {
			console.error('erro')
		},
	});

	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
		acceptedFiles
	} = useDropzone({
		maxFiles: 1
	});

	const style = useMemo(() => ({
		...baseStyle,
		...(isDragActive ? activeStyle : {}),
		...(isDragAccept ? acceptStyle : {}),
		...(isDragReject ? rejectStyle : {})
	}), [
		isDragActive,
		isDragReject,
		isDragAccept
	]);

	const files = acceptedFiles.map(file => (
		<li key={file.path}>
			{file.path} - {file.size} bytes
		</li>
	));

	return (
		<Container fluid>
			<Row>
				<Col>
					<section className="container">
						<div {...getRootProps({style})}>
							<input {...getInputProps()} />
							<p>Submeta seu currículo Lattes aqui</p>
						</div>
						<aside>
							<h4>Files</h4>
							<ul>{files}</ul>
						</aside>
					</section>
					<Button disabled={!acceptedFiles.length} onClick={() => mutation.mutate(acceptedFiles[0])}>Enviar arquivo</Button>
				</Col>
			</Row>
		</Container>
	)
}

export default HomePage