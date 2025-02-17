import { plaiStyles } from 'plai_common_frontend';
import { Text, View } from 'native-base';
import React from 'react';
import { noticeBarType } from './notice-bar.type';

const theTrueOrangeNoticeBarColor = {
    backgroundColor: '#FFEFE3'
};
const theTrueOrangeTextNoticeBarColor = {
    color: '#FF872E'
};
export const NoticeBar = ({
    message,
    data,
    list,
}: noticeBarType) => {
    const validation = Array.isArray(data) ? true : false;
    return (
        <>
            {validation ?
                <View style={[theTrueOrangeNoticeBarColor, plaiStyles.py8, plaiStyles.px12, plaiStyles.br8, plaiStyles.mt24]}>
                    <Text style={[theTrueOrangeTextNoticeBarColor, plaiStyles.mb8]}>
                        {message}
                    </Text>
                    {data?.map((item, index) => (
                        <View style={[plaiStyles.flex, plaiStyles.row]} key={index}>
                            <Text style={[theTrueOrangeTextNoticeBarColor]}>{list ? list : index + 1}</Text>
                            <View>
                                <Text
                                    style={[
                                        theTrueOrangeTextNoticeBarColor,
                                        plaiStyles.font12,
                                        plaiStyles.lineH20,
                                        plaiStyles.pl16
                                    ]}
                                >
                                    {item.key}
                                </Text>
                                {item.subKey?.length > 0 && item.subKey.map((subItem, subIndex) => (
                                    <Text key={subIndex} style={[
                                        theTrueOrangeTextNoticeBarColor,
                                        plaiStyles.font12,
                                        plaiStyles.lineH20,
                                        plaiStyles.pl16
                                    ]}>{subItem.item}</Text>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>
                :
                <View style={[plaiStyles.mt24, plaiStyles.px12, plaiStyles.py16, theTrueOrangeNoticeBarColor, plaiStyles.br8]}>
                    <Text style={[theTrueOrangeTextNoticeBarColor, plaiStyles.font12, plaiStyles.lineH16]}>{message}</Text>
                </View>
            }
        </>
    );
};