import * as d3 from 'd3';
import * as React from 'react';
import errorImg from '../../../images/error_img.png';
import infoImg from '../../../images/info_img.png';
import successImg from '../../../images/suc_img.png';

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
		let imgSrc;
		switch (nextProps.type) {
			case "<div style='color: rgba(214,48,48,1)'>ERROR</div>":
				imgSrc = errorImg;
				break;
			case "<div style='color: rgba(136,208,64,1)'>SUCCESS</div>":
				imgSrc = successImg;
				break;
			default:
				imgSrc = infoImg;
				break;
		}
		d3.select('.msg-content').html(nextProps.content);
		d3.select('.msg-title').html(nextProps.type);
		d3.select('.msg-img').attr('src', imgSrc);
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
						zIndex: zIndex
					}}
				/>
				<div
					className="msg-card"
					style={{
						zIndex: zIndex + 1
					}}
				>
					<img className="msg-img" />
					<div className="msg-header">
						<div className="msg-title" />
					</div>
					<div className="msg-body">
						<div className="msg-content" />
					</div>
					<div className="msg-bottom">
						<button
							className="msg-button"
							onClick={() => {
								this.props.close(0);
							}}
						>
							OK
						</button>
					</div>
				</div>
			</div>
		);
	}
}
