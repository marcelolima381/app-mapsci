import React, {useMemo} from 'react';
import {Button, Col, Container, ProgressBar, Row, Spinner} from "react-bootstrap";
import {useMutation} from "react-query";
import ApiService from "../../common/services";
import {useDropzone} from 'react-dropzone';
import {acceptStyle, activeStyle, baseStyle, rejectStyle} from "./dropzone-style";
import {pickColor} from "./pick-color";

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
		<Container fluid className='my-2'>
			<Row>
				<Col className='text-center'>
					<h3 className='my-3'>Mapsci</h3>
				</Col>
			</Row>
			<Row>
				<Col className="container">
					<section >
						<div {...getRootProps({style})}>
							<input {...getInputProps()} />
							<p>Submeta seu currículo Lattes aqui</p>
						</div>
						<ul>{files}</ul>
					</section>
					<Button className="float-right" disabled={!acceptedFiles.length} onClick={() => mutation.mutate(acceptedFiles[0])}>Enviar arquivo</Button>
				</Col>
			</Row>
			<Row>
				<Col className='my-3'>
					<div>
						{mutation.isLoading &&
							<React.Fragment>
								<p>Carregando previsões de campos de pesquisa</p>
								<Spinner animation="border" variant="primary" />
							</React.Fragment>
						}
						{mutation.isSuccess && mutation.data && mutation.data.map((field, index) => (
							<React.Fragment key={index}>
								<span><b>{field[0]}</b></span>
								<ProgressBar variant={pickColor(field[1]*100)} now={field[1]*100} label={`${(field[1]*100).toFixed(2)}%`} />
							</React.Fragment>
						))}
					</div>
				</Col>
			</Row>
		</Container>
	)
}

export default HomePage