import { Notify, Loading, Dialog, QSpinnerClock, QSpinnerTail } from 'quasar';
import { t } from 'src/i18n';

type AlertToastType = 'positive' | 'negative' | 'warning' | 'info' | 'ongoing';

export default class Alerts {
  private static toast(message: string, type: AlertToastType = 'info') {
    Notify.create({
      message,
      type,
      timeout: 2500,
      actions: [],
      position: 'top-right',
      html: true,
    });
  }

  static success(messageKey: string) {
    this.toast(t(messageKey), 'positive');
  }

  static info(messageKey: string) {
    this.toast(t(messageKey), 'info');
  }

  static warning(messageKey: string) {
    this.toast(t(messageKey), 'warning');
  }

  static error(messageKey: string) {
    this.toast(t(messageKey), 'negative');
  }

  static showLoading(messageKey: string, spinnerClock = false) {
    Loading.show({
      message: t(messageKey),
      boxClass: 'bg-grey-2 text-grey-9 text-bold',
      spinnerColor: 'teal-8',
      spinner: spinnerClock ? QSpinnerClock : QSpinnerTail,
    });
  }

  static hideLoading() {
    Loading.hide();
  }

  static showDialog(titleKey: string, messageKey: string) {
    Dialog.create({
      title: t(titleKey),
      message: t(messageKey),
      ok: {
        label: t('common.actions.close'),
        color: 'primary',
      },
    });
  }
}
