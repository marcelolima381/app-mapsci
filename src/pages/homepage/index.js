import React from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {useMutation} from "react-query";
import ApiService from "../../common/services";

function HomePage() {
	const mutation = useMutation((lattesZIP) => ApiService.postLattes(lattesZIP), {
		onSuccess: () => {
			console.info('sucesso')
		},
		onError: () => {
			console.error('erro')
		},
	});
	const lattesZIP = 123;

	return (
		<Container fluid>
			<Row>
				<Col>
					<Button onClick={() => mutation.mutate(lattesZIP)}>Trigger API</Button>
				</Col>
			</Row>
		</Container>
	)
}

export default HomePage