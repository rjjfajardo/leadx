import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import {
  SALES_AGENTS_CAP,
  SALES_AGENTS_TIERS,
} from '@/constants/salesAgentsCap';
import { useSalesAgents } from '@/hooks/api/salesAgents';
import { useResponseHandler } from '@/hooks/useResponseHandler';
import theme from '@/lib/theme';
import yup from '@/lib/yup';
import { useLeadsControllerAssignLeadsMutation } from '@/store/api/gen/leads';

export type SelectedTier = 'All' | 'TIER_1' | 'TIER_2' | 'TIER_3';

const schema = yup.object().shape({
  salesAgentIds: yup.array().of(yup.string().required()).required(),
  numberOfLeads: yup
    .number()
    .label('Number of leads')
    .transform((value) => (Number.isNaN(value) ? 0 : value))
    .required()
    .min(1)
    .integer('Must be a whole number'),
});

type FormValues = yup.Asserts<typeof schema>;
type Props = {
  handleClose: () => void;
};

export const useHooks = ({ handleClose }: Props) => {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const salesAgentsCount = useWatch({
    control,
    name: 'salesAgentIds',
  });

  const [selectedTier, setSelectedTier] = useState<SelectedTier>('All');

  const { salesAgents } = useSalesAgents({
    tier: selectedTier === 'All' ? undefined : selectedTier,
  });
  const [assignLeadMutation] = useLeadsControllerAssignLeadsMutation();
  const { handleSuccess, handleError } = useResponseHandler();

  const options = salesAgents.map((agent) => {
    const agentTier = agent.positions.map(
      (position) => position.tier,
    )[0] as SALES_AGENTS_TIERS;

    return {
      id: agent.id,
      label: `${agent.firstName} ${agent.lastName}`,
      count: agent.assignedLeadsCount,
      color:
        agent.assignedLeadsCount < SALES_AGENTS_CAP[agentTier]
          ? theme.palette.success.main
          : 'error',
      disabled: agent.assignedLeadsCount === SALES_AGENTS_CAP[agentTier],
    };
  });

  const onSubmit = async (values: FormValues) => {
    const { salesAgentIds, numberOfLeads } = values;

    try {
      const response = await assignLeadMutation({
        assignLeadDto: {
          salesAgentIds,
          leadsToAssign: numberOfLeads,
        },
      }).unwrap();

      if (response.success) {
        handleSuccess(response.success);
        handleCloseAndReset();
      }

      if (response.error) {
        handleError(undefined, response.error);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleCloseAndReset = () => {
    reset({
      salesAgentIds: [],
      numberOfLeads: undefined,
    });
    setSelectedTier('All');
    handleClose();
  };

  useEffect(() => {
    reset({
      salesAgentIds: undefined,
    });
  }, [selectedTier]);

  return {
    control,
    selectedTier,
    setSelectedTier,
    salesAgents,
    options,
    onSubmit: handleSubmit(onSubmit),
    handleCloseAndReset,
    salesAgentsCount,
  };
};
