import styled from '@emotion/styled';
import data from 'data.json';
import Host from '../Contact/Host.tsx';
import { Caption, Paragraph } from '@/components/Text.tsx';

const Invitation = () => {
  const { greeting } = data;
  const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];
  const firstDay = 3; // 0 = Sunday, so April 1st 2026 is Wednesday
  const daysInMonth = 30;
  const highlightDate = 4;
  const weeksToRender = Math.ceil((firstDay + daysInMonth) / 7);

  const calendarCells = Array.from(
    { length: weeksToRender * 7 },
    (_, index) => {
      const date = index - firstDay + 1;
      return date > 0 && date <= daysInMonth ? date : null;
    },
  );

  const weeks = [];
  for (let i = 0; i < calendarCells.length; i += 7) {
    weeks.push(calendarCells.slice(i, i + 7));
  }

  return (
    <InvitationWrapper>
      <Paragraph>{greeting.message}</Paragraph>
      <Host />
      <Caption textAlign={'center'}>{greeting.eventDetail}</Caption>
      <CalendarContainer>
        <CalendarTitle>4월</CalendarTitle>
        <CalendarSubtitle>두 사람, 결혼합니다</CalendarSubtitle>
        <Separator />
        <CalendarGrid>
          <CalendarHeadRow>
            {DAY_LABELS.map((label, index) => (
              <DayLabel key={label} isSunday={index === 0} isSaturday={index === 6}>
                {label}
              </DayLabel>
            ))}
          </CalendarHeadRow>
          {weeks.map((week, weekIndex) => (
            <CalendarRow key={`week-${weekIndex}`}>
              {week.map((date, dayIndex) => {
                const isSelected = date === highlightDate;
                const isSunday = dayIndex === 0;
                const isSaturday = dayIndex === 6;
                return (
                  <CalendarCell
                    key={`d-${weekIndex}-${dayIndex}`}
                    isEmpty={!date}
                    isSunday={isSunday}
                    isSaturday={isSaturday}
                    isSelected={Boolean(isSelected)}
                  >
                    {date && (
                      <DateBadge isSelected={Boolean(isSelected)}>{date}</DateBadge>
                    )}
                  </CalendarCell>
                );
              })}
            </CalendarRow>
          ))}
        </CalendarGrid>
        <Separator />
      </CalendarContainer>
    </InvitationWrapper>
  );
};

export default Invitation;

const InvitationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const CalendarContainer = styled.div`
  width: 280px;
  padding: 24px 28px;
  border-radius: 20px;
  border: 1px solid rgba(210, 210, 210, 0.8);
  background-color: #fff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
`;

const CalendarTitle = styled.p`
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  margin: 0;
`;

const CalendarSubtitle = styled.p`
  font-size: 14px;
  color: #7d7d7d;
  text-align: center;
  margin: 4px 0 20px;
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.08);
  margin: 18px 0;
`;

const CalendarGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CalendarHeadRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-size: 12px;
  letter-spacing: 1px;
  color: #a0a0a0;
`;

const DayLabel = styled.span<{ isSunday: boolean; isSaturday: boolean }>`
  color: ${({ isSunday, isSaturday }) => {
    if (isSunday) return '#d45f5f';
    if (isSaturday) return '#4b7edc';
    return '#a0a0a0';
  }};
`;

const CalendarRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

const CalendarCell = styled.div<{
  isEmpty: boolean;
  isSunday: boolean;
  isSaturday: boolean;
  isSelected: boolean;
}>`
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ isSunday, isSaturday }) => {
    if (isSunday) return '#d45f5f';
    if (isSaturday) return '#4b7edc';
    return '#2c2c2c';
  }};
  opacity: ${({ isEmpty }) => (isEmpty ? 0.3 : 1)};
`;

const DateBadge = styled.span<{ isSelected: boolean }>`
  width: 32px;
  height: 32px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-weight: ${({ isSelected }) => (isSelected ? 600 : 400)};
  background-color: ${({ isSelected }) => (isSelected ? '#f0d7c7' : 'transparent')};
  color: ${({ isSelected }) => (isSelected ? '#b35438' : 'inherit')};
`;
