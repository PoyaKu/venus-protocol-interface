/** @jsxImportSource @emotion/react */
import React, { useContext, useState, useMemo } from 'react';
import { BigNumber } from 'bignumber.js';
import { useParams } from 'react-router-dom';
import type { TransactionReceipt } from 'web3-core';
import { useTranslation } from 'translation';
import { useGetProposal, useGetVoters, useGetCurrentVotes, useGetVoteReceipt } from 'clients/api';
import useVote, { UseVoteParams } from 'hooks/useVote';
import { Spinner } from 'components';
import { IProposal, IVoter } from 'types';
import { convertWeiToTokens } from 'utilities';
import { AuthContext } from 'context/AuthContext';
import TEST_IDS from './testIds';
import VoteSummary from './VoteSummary';
import VoteModal from './VoteModal';
import ProposalSummary from './ProposalSummary';
import { Description } from './Description';
import { useStyles } from './styles';

interface ProposalUiProps {
  proposal: IProposal | undefined;
  forVoters: IVoter;
  againstVoters: IVoter;
  abstainVoters: IVoter;
  vote: (params: UseVoteParams) => Promise<TransactionReceipt>;
  votingEnabled: boolean;
  readableVoteWeight: string;
  isVoteLoading: boolean;
}

export const ProposalUi: React.FC<ProposalUiProps> = ({
  proposal,
  forVoters,
  againstVoters,
  abstainVoters,
  vote,
  votingEnabled,
  readableVoteWeight,
  isVoteLoading,
}) => {
  const styles = useStyles();
  const { t } = useTranslation();
  const [voteModalType, setVoteModalType] = useState<0 | 1 | 2 | undefined>(undefined);

  // Summing contract totals because there is a delay getting the totals from the server
  const totalVotesWei = useMemo(
    () =>
      forVoters.sumVotes.for.plus(
        againstVoters.sumVotes.against.plus(abstainVoters.sumVotes.abstain),
      ),
    [
      forVoters.sumVotes.for.toFixed(),
      againstVoters.sumVotes.against.toFixed(),
      abstainVoters.sumVotes.abstain.toFixed(),
    ],
  );

  if (!proposal) {
    return (
      <div css={[styles.root, styles.spinner]}>
        <Spinner />
      </div>
    );
  }

  return (
    <div css={styles.root}>
      <ProposalSummary css={styles.summary} proposal={proposal} />

      <div css={styles.votes}>
        <VoteSummary
          css={styles.vote}
          label={t('vote.for')}
          votedValueWei={forVoters.sumVotes.for}
          votedTotalWei={totalVotesWei}
          voters={forVoters.result}
          openVoteModal={() => setVoteModalType(1)}
          progressBarColor={styles.successColor}
          votingEnabled={votingEnabled}
          testId={TEST_IDS.voteSummary.for}
        />

        <VoteSummary
          css={styles.vote}
          label={t('vote.against')}
          votedValueWei={againstVoters.sumVotes.against}
          votedTotalWei={totalVotesWei}
          voters={againstVoters.result}
          openVoteModal={() => setVoteModalType(0)}
          progressBarColor={styles.againstColor}
          votingEnabled={votingEnabled}
          testId={TEST_IDS.voteSummary.against}
        />

        <VoteSummary
          css={styles.vote}
          label={t('vote.abstain')}
          votedValueWei={abstainVoters.sumVotes.abstain}
          votedTotalWei={totalVotesWei}
          voters={abstainVoters.result}
          openVoteModal={() => setVoteModalType(2)}
          progressBarColor={styles.abstainColor}
          votingEnabled={votingEnabled}
          testId={TEST_IDS.voteSummary.abstain}
        />
      </div>

      <Description description={proposal.description} actions={proposal.actions} />

      {voteModalType !== undefined && (
        <VoteModal
          voteModalType={voteModalType}
          handleClose={() => setVoteModalType(undefined)}
          vote={async (voteReason?: string) =>
            vote({ proposalId: proposal.id, voteType: voteModalType, voteReason })
          }
          readableVoteWeight={readableVoteWeight}
          isVoteLoading={isVoteLoading}
        />
      )}
    </div>
  );
};

const Proposal = () => {
  const { account } = useContext(AuthContext);
  const { id } = useParams<{ id: string }>();
  const accountAddress = account?.address;
  const { data: proposal } = useGetProposal({ id }, { enabled: !!id });

  const { data: votingWeightWei = new BigNumber(0) } = useGetCurrentVotes(
    { accountAddress: accountAddress || '' },
    { enabled: !!accountAddress },
  );

  const readableVoteWeight = useMemo(
    () =>
      convertWeiToTokens({
        valueWei: votingWeightWei,
        tokenId: 'xvs',
        returnInReadableFormat: true,
        addSymbol: false,
      }),
    [votingWeightWei],
  );

  const defaultValue = {
    result: [],
    sumVotes: {
      for: new BigNumber(0),
      against: new BigNumber(0),
      abstain: new BigNumber(0),
      total: new BigNumber(0),
    },
  };
  const { data: againstVoters = defaultValue } = useGetVoters(
    { id: id || '', filter: 0 },
    { enabled: !!id },
  );
  const { data: forVoters = defaultValue } = useGetVoters(
    { id: id || '', filter: 1 },
    { enabled: !!id },
  );
  const { data: abstainVoters = defaultValue } = useGetVoters(
    { id: id || '', filter: 2 },
    { enabled: !!id },
  );

  const { vote, isLoading } = useVote({ accountAddress: account?.address || '' });
  const { data: userVoteReceipt } = useGetVoteReceipt(
    { proposalId: parseInt(id, 10), accountAddress },
    { enabled: !!accountAddress },
  );

  const votingEnabled =
    !!accountAddress &&
    proposal?.state === 'Active' &&
    userVoteReceipt?.voteSupport === 'NOT_VOTED' &&
    votingWeightWei.isGreaterThan(0);

  return (
    <ProposalUi
      proposal={proposal}
      forVoters={forVoters}
      againstVoters={againstVoters}
      abstainVoters={abstainVoters}
      vote={vote}
      votingEnabled={votingEnabled}
      readableVoteWeight={readableVoteWeight}
      isVoteLoading={isLoading}
    />
  );
};

export default Proposal;