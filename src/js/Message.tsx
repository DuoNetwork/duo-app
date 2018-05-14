import * as d3 from 'd3';
import * as React from 'react';

interface IProps {
	type: string;
	content: string;
	show: number;
	close: (e: number) => void;
}

export default class Message extends React.Component<IProps> {
	constructor(props) {
		super(props);
	}

	public componentWillReceiveProps(nextProps: IProps) {
		d3.select('.msg-content').html(nextProps.content);
		d3.select('.msg-title').html(nextProps.type);
	}

	public render() {
		let zIndex: number, event: string;
		zIndex = this.props.show === 0 ? -11 : 11;
		event = this.props.show === 0 ? 'none' : 'auto';
		return (
			<div
				className="msg"
				style={{ opacity: this.props.show, zIndex: zIndex, pointerEvents: event as any }}
			>
				<div
					className="msg-bg"
					style={{
						width: '100vw',
						height: '100vh',
						position: 'fixed',
						top: '0',
						left: '0',
						background: 'rgba(0, 0, 0, .6)',
						zIndex: zIndex
					}}
				/>
				<div
					className="msg-card"
					style={{
						width: '400px',
						height: '140px',
						position: 'fixed',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						background: 'rgb(20, 20, 20)',
						zIndex: zIndex + 1
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							flexDirection: 'row',
							height: '18px',
							width: '378px',
							color: 'white',
							border: '1px solid rgba(250,250,250,.7)',
							padding: '10px'
						}}
					>
						<div className="msg-title" />
					</div>
					<div
						style={{
							width: '378px',
							height: '39px',
							border: '1px solid rgba(250,250,250,.7)',
							borderBottom: 'none',
							padding: '10px',
							color: 'white'
						}}
					>
						<div className="msg-content" />
					</div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							flexDirection: 'row',
							height: '19px',
							width: '378px',
							color: 'white',
							border: '1px solid rgba(250,250,250,.7)',
							borderTop: 'none',
							padding: '10px'
						}}
					>
						<button style={{ padding: '5px 15px' }} onClick={() => this.props.close(0)}>
							OK
						</button>
					</div>
				</div>
			</div>
		);
	}
}
