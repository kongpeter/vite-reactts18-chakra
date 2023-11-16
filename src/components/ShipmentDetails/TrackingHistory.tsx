/* eslint-disable no-nested-ternary */
import { CheckCircleIcon, QuestionIcon, WarningIcon } from '@chakra-ui/icons';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Step,
  StepIndicator,
  Stepper,
  StepSeparator,
  Text,
} from '@chakra-ui/react';

import './index.less';

import { formatDate } from '../../utils/general';
import { TrackingEvent } from '../../utils/type';

export function TrackingHistory(currentData: any) {
  const data: TrackingEvent[] = currentData?.currentData?.trackingEvents;

  const renderIcon = (statusSeverity: string) => {
    if (statusSeverity === 'Success') {
      return <CheckCircleIcon color="green" boxSize={4} />;
    }

    if (statusSeverity === 'info') {
      <QuestionIcon color="yellow" boxSize={4} />;
    }

    return <WarningIcon color="red" boxSize={4} />;
  };

  return (
    <AccordionItem className="accordion-container">
      <h2>
        <AccordionButton>
          <Box marginRight="auto" textAlign="left">
            <Text className="acc-text">TRACKING HISTORY</Text>
          </Box>
          <AccordionIcon color="gray" />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        {data?.length > 0 ? (
          <Box className="stepper-container">
            <Stepper gap={0} index={0} orientation="vertical" width="100%">
              {data.map((event: TrackingEvent, index) => (
                <Step key={event?.id} className="stepper">
                  <StepIndicator className="icon">
                    {renderIcon(event?.statusSeverity)}
                  </StepIndicator>
                  <Box width="100%" paddingTop="20px">
                    <Box className="box-container">
                      <Box>
                        <Text className="status">{event?.status}</Text>
                        <Text className="location">{event?.location}</Text>
                      </Box>
                      <Box className="time-box">
                        <Text className="status">
                          {event?.timestamp &&
                            formatDate(event?.timestamp, {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                        </Text>
                        <Text className="location">
                          {event?.timestamp &&
                            formatDate(event?.timestamp, {
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true,
                            })}
                        </Text>
                      </Box>
                    </Box>
                    <Divider
                      className={
                        index === data?.length - 1 ? 'last-divider' : 'divider'
                      }
                    />
                  </Box>
                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
          </Box>
        ) : (
          <Text size="xs" fontWeight="500">
            No data
          </Text>
        )}
      </AccordionPanel>
    </AccordionItem>
  );
}
