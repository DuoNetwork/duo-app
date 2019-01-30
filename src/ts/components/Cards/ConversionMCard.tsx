import { ICustodianContractAddress } from '@finbook/duo-contract-wrapper';
import * as React from 'react';
import * as CST from 'ts/common/constants';
import { IConversion } from 'ts/common/types';
import { SDivFlexCenter } from '../_styled';
import { SCard, SCardList, SCardTitle } from './_styled';
import ConversionEntry from './ConversionEntry';

interface IProps {
	contractAddress: ICustodianContractAddress;
	locale: string;
	conversions: IConversion[];
}

export default class ConversionMCard extends React.Component<IProps> {
	public render() {
		const { conversions, locale, contractAddress } = this.props;
		return (
			<SCard
				title={<SCardTitle>{CST.TH_CONVERSION[locale].toUpperCase()}</SCardTitle>}
				width="100%"
				margin="20px 0 20px 0"
			>
				<SDivFlexCenter horizontal padding="0 10px">
					<SCardList noMargin>
						<div className="status-list-wrapper">
							{conversions.length ? (
								conversions.map(c => (
									<ConversionEntry
										key={c.timestamp}
										timestamp={c.timestamp}
										type={c.type}
										eth={c.eth}
										tokenACode={contractAddress.aToken.code}
										tokenBCode={contractAddress.bToken.code}
										tokenA={c.tokenA}
										tokenB={c.tokenB}
										pending={c.pending}
										reverted={c.reverted}
										locale={locale}
									/>
								))
							) : (
								<ul>
									<li className="block-title t-center">
										{CST.TH_NODATA[locale]}
									</li>
								</ul>
							)}
						</div>
					</SCardList>
				</SDivFlexCenter>
			</SCard>
		);
	}
}
