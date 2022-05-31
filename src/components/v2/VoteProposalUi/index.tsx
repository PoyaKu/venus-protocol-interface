/** @jsxImportSource @emotion/react */
import React, { useMemo } from 'react';
import Countdown from 'react-countdown';
import { CountdownRenderProps } from 'react-countdown/dist/Countdown';
import { SerializedStyles } from '@emotion/react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { useTranslation } from 'translation';
import { Icon, IconName } from '../Icon';
import { Spinner } from '../Spinner';
import { ActiveVotingProgress } from './ActiveVotingProgress';
import { useStyles } from './styles';

type ProposalCardStatus = 'queued' | 'readyToExecute' | 'executed' | 'cancelled';
type ProposalStatus = 'active' | ProposalCardStatus;

interface IStatusCard {
  status: ProposalCardStatus;
}

const StatusCard: React.FC<IStatusCard> = ({ status }) => {
  const styles = useStyles();
  const { t } = useTranslation();

  const statusContent: Record<
    ProposalCardStatus,
    {
      iconWrapperCss: SerializedStyles | SerializedStyles[];
      iconName: IconName;
      iconCss: SerializedStyles | SerializedStyles[];
      label: string;
    }
  > = useMemo(
    () => ({
      queued: {
        iconWrapperCss: [styles.iconWrapper, styles.iconDotsWrapper],
        iconName: 'dots',
        iconCss: styles.icon,
        label: t('voteProposalUi.statusCard.queued'),
      },
      readyToExecute: {
        iconWrapperCss: [styles.iconWrapper, styles.iconInfoWrapper],
        iconName: 'exclamation',
        iconCss: styles.icon,
        label: t('voteProposalUi.statusCard.readyToExecute'),
      },
      executed: {
        iconWrapperCss: [styles.iconWrapper, styles.iconMarkWrapper],
        iconName: 'mark',
        iconCss: [styles.icon, styles.iconCheck],
        label: t('voteProposalUi.statusCard.executed'),
      },
      cancelled: {
        iconWrapperCss: [styles.iconWrapper, styles.iconCloseWrapper],
        iconName: 'close',
        iconCss: styles.icon,
        label: t('voteProposalUi.statusCard.cancelled'),
      },
    }),
    [],
  );

  switch (status) {
    case 'queued':
    case 'readyToExecute':
    case 'executed':
    case 'cancelled':
      return (
        <>
          <div css={statusContent[status].iconWrapperCss}>
            <Icon css={statusContent[status].iconCss} name={statusContent[status].iconName} />
          </div>
          <Typography css={styles.statusText} variant="body2">
            {statusContent[status].label}
          </Typography>
        </>
      );
    default:
      return <Spinner variant="small" />;
  }
};

type VoteStatus = 'votedFor' | 'votedAgainst' | 'abstained';

interface IVoteProposalUiProps {
  className?: string;
  proposalNumber: number;
  proposalText: string;
  proposalStatus: ProposalStatus;
  cancelDate?: Date;
  voteStatus?: VoteStatus;
  votedFor?: string;
  votedAgainst?: string;
  abstain?: string;
}

export const VoteProposalUi: React.FC<IVoteProposalUiProps> = ({
  className,
  proposalNumber,
  proposalText,
  proposalStatus,
  cancelDate,
  voteStatus,
  votedFor,
  votedAgainst,
  abstain,
}) => {
  const styles = useStyles();
  const { t } = useTranslation();

  const voteStatusText = useMemo(() => {
    switch (voteStatus) {
      case 'votedFor':
        return t('voteProposalUi.voteStatus.votedFor');
      case 'votedAgainst':
        return t('voteProposalUi.voteStatus.votedAgainst');
      case 'abstained':
        return t('voteProposalUi.voteStatus.abstained');
      default:
        return t('voteProposalUi.voteStatus.notVoted');
    }
  }, [voteStatus]);

  const countdownRenderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRenderProps) => {
    if (completed) {
      // Render a completed state
      return null;
    }
    // Render a countdown
    if (days) {
      return `${days}d ${hours}h : ${minutes}m : ${seconds}s`;
    }
    if (hours) {
      return `${hours}h : ${minutes}m : ${seconds}s`;
    }
    if (minutes) {
      return `${minutes}m : ${seconds}s`;
    }
    return `${seconds}s`;
  };

  return (
    <Paper className={className} css={styles.root}>
      <Grid container>
        <Grid css={[styles.gridItem, styles.gridItemLeft]} item xs={12} sm={8}>
          <div css={styles.cardHeader}>
            <div css={styles.cardBadges}>
              <Typography
                variant="small2"
                color="textPrimary"
                css={[styles.cardBadgeItem, styles.cardBadgeNumber]}
              >
                #{proposalNumber}
              </Typography>
              {proposalStatus === 'active' && (
                <Typography
                  variant="small2"
                  color="textPrimary"
                  css={[styles.cardBadgeItem, styles.cardBadgeActive]}
                >
                  {t('voteProposalUi.proposalStatus.active')}
                </Typography>
              )}
            </div>

            <Typography variant="small2">{voteStatusText}</Typography>
          </div>

          <Typography variant="h4" css={styles.cardTitle}>
            {proposalText}
          </Typography>

          <div css={styles.cardFooter}>
            {cancelDate && (
              <Typography variant="small2">
                {t('voteProposalUi.activeUntil')}
                <Typography css={styles.activeUntilDate} variant="small2" color="textPrimary">
                  {cancelDate.toLocaleString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Typography>
              </Typography>
            )}

            <Typography color="textPrimary" variant="small2">
              <Countdown date={cancelDate} renderer={countdownRenderer} />
            </Typography>
          </div>
        </Grid>
        <Grid css={[styles.gridItem, styles.gridItemRight]} item xs={12} sm={4}>
          {proposalStatus === 'active' ? (
            <ActiveVotingProgress
              votedFor={votedFor}
              votedAgainst={votedAgainst}
              abstain={abstain}
            />
          ) : (
            <StatusCard status={proposalStatus} />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};
