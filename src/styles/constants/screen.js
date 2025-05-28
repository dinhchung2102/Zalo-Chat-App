import { Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('window');

export const BASE_UNIT = Math.min(width, height);

export const introData = {
  vie: [
    {
      _id: 1,
      title: 'Gọi video ổn định',
      description: 'Trò chuyện thật đã với chất lượng video ổn định mọi lúc, mọi nơi',
      image: require('../../../assets/home/goi-video-on-dinh.jpg'),
    },
    {
      _id: 2,
      title: 'Chat nhóm tiện ích',
      description: 'Nơi cùng nhau trao đổi, giữ liên lạc với gia đình, bạn bè, đồng nghiệp...',
      image: require('../../../assets/home/chat-nhom-tien-ich.jpg'),
    },
    {
      _id: 3,
      title: 'Gửi ảnh nhanh chóng',
      description:
        'Trao đổi hình ảnh chất lượng cao với bạn bè và người thân thật nhanh và dễ dàng',
      image: require('../../../assets/home/gui-anh-nhanh-chong.jpg'),
    },
    {
      _id: 4,
      title: 'Nhật ký bạn bè',
      description: 'Nơi cập nhật hoạt động mới nhất của những người bạn quan tâm',
      image: require('../../../assets/home/nhat-ky-ban-be.jpg'),
    },
    {
      _id: 5,
      title: '',
      description: '',
      image: require('../../../assets/home/no-title.jpg'),
    },
  ],
  eng: [
    {
      _id: 1,
      title: 'Smooth video call',
      description: 'Perform video calls with high-quality over all type of networks',
      image: require('../../../assets/home/goi-video-on-dinh.jpg'),
    },
    {
      _id: 2,
      title: 'Convenient group chat',
      description: 'Stay in touch with your family, colleagues and friends',
      image: require('../../../assets/home/chat-nhom-tien-ich.jpg'),
    },
    {
      _id: 3,
      title: 'Quick photo sharing',
      description: 'Share photos in high quality with everyone easily',
      image: require('../../../assets/home/gui-anh-nhanh-chong.jpg'),
    },
    {
      _id: 4,
      title: 'Social timeline',
      description: 'Stay updated with latest activities of people you care about',
      image: require('../../../assets/home/nhat-ky-ban-be.jpg'),
    },
    {
      _id: 5,
      title: '',
      description: '',
      image: require('../../../assets/home/no-title.jpg'),
    },
  ],
};
