import { View, Text } from 'react-native'
import React from 'react'
import { DraftCard, TConfigCard, plaiStyles } from 'plai_common_frontend'
import { ISummaryProposal } from '../../../../utilities'

type TEDraftCard = {
    item: ISummaryProposal
    isMultipleSync: boolean
    selected: boolean
    onSelected: (value: any) => void
    onIconMore: () => void
    config: TConfigCard
}

export const EDraftCard = ({
    item,
    isMultipleSync,
    selected,
    onSelected,
    onIconMore,
    config
}: TEDraftCard) => {
    return <DraftCard
        wrapperStyle={plaiStyles.mt12}
        config={config}
        data={item}
        isMultipleSync={isMultipleSync}
        selected={selected}
        onSelected={onSelected}
        onIconMore={onIconMore}
    />
}