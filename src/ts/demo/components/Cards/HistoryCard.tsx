// import * as d3 from 'd3';
import * as React from 'react';

// const moment = require('moment');

interface IProps {
	trades: string[];
}

interface IStates {
	page: number;
	enableLButton: boolean;
}

export default class HistoryCard extends React.Component<IProps, IStates> {
	constructor(props) {
		super(props);
		this.state = {
			page: 0,
			enableLButton: false
		};
	}

	private group(historyList: string[]): string[][] {
		const groupedHistory: string[][] = [];
		if (historyList.length)
			for (let i = 0; i <= Math.floor(historyList.length / 10); i++) {
				groupedHistory[i] = [];
				for (let j = 0; j < 10; j++) groupedHistory[i][j] = historyList[i * 10 + j];
			}

		return groupedHistory;
	}
	public handlePrev = () => {
		console.log(this.state.page);
		const { page } = this.state;
		if (page > 0)
			if (page === 1)
				this.setState({
					page: page - 1,
					enableLButton: false
				});
			else
				this.setState({
					page: page - 1,
					enableLButton: true
				});
	};
	public handleNext = () => {
		console.log(this.state.page);
		const { page } = this.state;
		if (page < Math.floor((this.props.trades.length - 1) / 10))
			if (page === Math.floor((this.props.trades.length - 1) / 10 - 1))
				this.setState({
					page: page + 1,
					enableLButton: true
				});
			else
				this.setState({
					page: page + 1,
					enableLButton: true
				});
	};
	public handleStart = () => {
		this.setState({
			page: 0,
			enableLButton: false
		});
	};
	public handleEnd = () => {
		this.setState({
			page: Math.floor((this.props.trades.length - 1) / 10),
			enableLButton: true
		});
	};
	public render() {
		const { trades } = this.props;
		const { page, enableLButton } = this.state;
		const groupedHistory = this.group(trades);
		const maxPage = Math.floor(((history.length || 1) - 1) / 10);
		const historyList = groupedHistory.length ? (
			groupedHistory[page].map((d, i) => (d ? <li key={i}>{d}</li> : null))
		) : (
			<li>No transaction</li>
		);
		return (
			<div className="history-card">
				<div className="history-card-title">History</div>
				<div className="history-card-body">
					<ul>{historyList}</ul>
				</div>
				<div className="history-card-bottom">
					<button disabled={!enableLButton} onClick={this.handleStart}>
						&#60;&#60;
					</button>
					<button disabled={!enableLButton} onClick={this.handlePrev}>
						&#60;
					</button>
					<div>{'Page ' + (page + 1) + ' of ' + (maxPage + 1 || 1)}</div>
					<button disabled={page + 1 === (maxPage + 1 || 1)} onClick={this.handleNext}>
						&#62;
					</button>
					<button disabled={page + 1 === (maxPage + 1 || 1)} onClick={this.handleEnd}>
						&#62;&#62;
					</button>
				</div>
			</div>
		);
	}
}
