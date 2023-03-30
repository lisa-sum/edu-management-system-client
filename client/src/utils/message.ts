import type { MessageBasic } from '@/type'

const notUpdatedMessage = (userIdentity: string, roomIdentity: string, data: any, updatedTime: number | string): MessageBasic => {
	return {
		userIdentity,
		roomIdentity,
		data,
		createdTime: new Date().getTime(),
		updatedTime,
	}
}

const UpdatedMessage = (userIdentity: string, roomIdentity: string, data: string): MessageBasic => {
	return {
		userIdentity,
		roomIdentity,
		data,
		updatedTime: new Date().getTime(),
		createdTime: new Date().getTime(),
	}
}

export const messageBasic = (msg: MessageBasic): string => {
	const { userIdentity, roomIdentity, data, createdTime } = msg
	if (createdTime) {
		return JSON.stringify(notUpdatedMessage(userIdentity, roomIdentity, data, createdTime as number))
	}
	return JSON.stringify(UpdatedMessage(userIdentity, roomIdentity, data))
}
