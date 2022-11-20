import dayjs from 'dayjs';
import { Dimensions, View } from 'react-native';
import { Card } from '../../components/Statistics/Card';
import { t } from '../../helpers/translation';
import { useLogState } from '../../hooks/useLogs';
import { getRatingDistributionForXDays } from '../../hooks/useStatistics/RatingDistribution';

import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { RatingChart } from '../../components/RatingChart';
import { CardFeedback } from '../../components/Statistics/CardFeedback';

dayjs.extend(isSameOrAfter);

export const RatingDistribution = ({
  title,
  startDate,
}: {
  title: string,
  startDate?: string,
}) => {
  const logState = useLogState();

  const items = Object.values(logState.items).filter(item => {
    return dayjs(item.date).isSameOrAfter(startDate)
  })

  const data = getRatingDistributionForXDays(items, startDate, 14)

  const width = Dimensions.get('window').width - 80;
  const height = width / 2;

  return (
    <Card
      subtitle={t('mood')}
      title={title}
    >
      <View
        style={{
          justifyContent: 'flex-start',
        }}
      >
        <RatingChart
          data={data}
          height={height}
          width={width}
        />
        <CardFeedback
          type='rating_distribution_two_weeks'
          details={data}
        />
      </View>
    </Card>
  );
};
