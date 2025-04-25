import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { sendRequest } from "../../api/friend/sendRequest";
import { useRecoilValue } from "recoil";
import { loginResultState } from "../../state/PrimaryState";
import { BASE_UNIT } from "../../styles/constants/screen";
import { Colors } from "../../styles/Colors";

export default function AddFriendButton({ targetUser, onPress }) {
  const loginResult = useRecoilValue(loginResultState);
  const [sendRequestStatus, setSendRequestStatus] = useState(false);

  const isPending = targetUser.status === "pending";
  const isFriend = targetUser.isFriend === true;

  let relationshipLabel = "Kết bạn";

  if (isPending) {
    relationshipLabel = "Hủy yêu cầu";
  } else if (isFriend) {
    relationshipLabel = "Bạn bè";
  }

  const handleSendRequest = async () => {
    try {
      const res = await sendRequest(
        targetUser.user.phoneNumber,
        loginResult.token
      );
      setSendRequestStatus(true);
      console.log("✅ Gửi lời mời thành công:", res);
    } catch (err) {
      console.log("❌ Không thể gửi lời mời:", err.message);
    }
  };
  return (
    <TouchableOpacity
      style={{
        width: BASE_UNIT * 0.2,
        backgroundColor: Colors.primary,
        height: BASE_UNIT * 0.08,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: BASE_UNIT * 0.05,
      }}
      onPress={handleSendRequest ?? onPress}
    >
      <Text style={{ color: "white" }}>
        {relationshipLabel}
      </Text>
    </TouchableOpacity>
  );
}
