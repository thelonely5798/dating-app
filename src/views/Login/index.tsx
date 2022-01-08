import * as React from 'react';
import { View, Text, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import CustomButton from '../../components/Button';
import CustomText from '../../components/Text';
import LinearGradient from 'react-native-linear-gradient';
import { AlertDialog, Button, Center, NativeBaseProvider, TextArea } from "native-base"
import { myContract, web3, contractAddress } from '../../web3';
import { useDispatch } from 'react-redux';
import { isLogined, userLogin } from '../../redux/slices/userSlice';
import { useAppSelector } from '../../redux/store';
import { useNavigation } from '@react-navigation/native';


function LoginScreen() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = React.useState(false)
  const cancelRef = React.useRef(null)
  const dispatch = useDispatch()
  const logined = useAppSelector(isLogined)
  web3.utils.fromUtf8("Xin chào")
  React.useEffect(()=> {
    if (logined) navigation.navigate("Home")
  }, [logined])

  const onClose = () => {
    setIsOpen(false)
    dispatch(userLogin("9d3ec4cce310c8f0cf9756c6a953da1d7d23da18d21e2345f8fafd61eba345fb"))
  }

  return (
    <LinearGradient style={{flex: 1, justifyContent: "center", alignItems: "center"}} useAngle={true} angle={45} angleCenter={{ x: 0.5, y: 0.5}} colors={['rgb(235, 51, 73)', 'rgb(244, 92, 67)']} >
      <CustomButton onPress={() => setIsOpen(!isOpen)} style={{ backgroundColor: "#fff",width: "70%" }}  textStyle={{ color: "black" }}>
        {t('Have account')} 
      </CustomButton>
      <CustomButton style={{ backgroundColor: "#fff", width: "70%" }} textStyle={{ color: "black" }}>
        {t('Register account')}
      </CustomButton>

      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Đăng nhập}</AlertDialog.Header>
          <AlertDialog.Body>
            <TextArea placeholder="Nhập 12 ký tự đặc biệt của ví"/>
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}
              >
                Hủy bỏ
              </Button>
              <Button colorScheme="danger" onPress={onClose}>
                Xác nhận
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </LinearGradient>
  );
}

export default LoginScreen;
