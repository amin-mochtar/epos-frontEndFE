import React, { useState } from "react";
import { useSubmission } from "../../hooks";
import { ModalInformation } from "plai_common_frontend";
import { StackActions, useNavigation } from "@react-navigation/native";
import { EposRoutes } from "../../navigation";
import { submissionProposal } from "../../network";
import { showModalFailedSubmitDoksul } from "../../utilities";


type TSubmissionModal = {
    visible: boolean
    privyData: string
}
export const submissionModal = ({
    visible = false,
    privyData,
}: TSubmissionModal) => {
    const navigation = useNavigation();
    const { generateSubmission } = useSubmission();
    const privyIdData = JSON.parse(privyData);
    const [visibleModal, setVisibleModal] = useState(visible)
    const submission = async () => {
        const submissionData = await generateSubmission({
            privyPh: privyIdData.privyIdPH == 'failed' ? '' : privyIdData.privyIdPH,
            privyAgent: privyIdData.privyIdAgent == 'failed' ? '' : privyIdData.privyIdAgent,
            privyLA: privyIdData.privyIdLA == 'failed' ? '' : privyIdData.privyIdLA,
            privyPY: privyIdData.privyIdPY == 'failed' ? '' : privyIdData.privyIdPY,
        })
        const submissionProposalResult = await submissionProposal(submissionData);
        if (submissionProposalResult.responseCode == '00') {
            navigation.dispatch(StackActions.replace(EposRoutes.LINK_SUBMITTED));
        } else {
            showModalFailedSubmitDoksul();
        }
    }
    return (
        <ModalInformation
            title={'Ajukan Proposal'}
            desc={'Anda yakin ingin mengajukan proposal?'}
            visible={visibleModal}
            buttonPrimary={{
                text: 'Ajukan',
                onPress: () => {
                    setVisibleModal(false)
                    submission();
                },
            }}
            buttonSecondary={{
                text: 'Batal',
                onPress: () => { setVisibleModal(false) },
            }}
        />
    )
}