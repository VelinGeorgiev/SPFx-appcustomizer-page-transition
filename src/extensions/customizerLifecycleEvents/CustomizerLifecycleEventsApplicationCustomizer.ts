import { override } from '@microsoft/decorators';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import { SPEventArgs } from '@microsoft/sp-core-library';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ICustomizerLifecycleEventsApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class CustomizerLifecycleEventsApplicationCustomizer
  extends BaseApplicationCustomizer<ICustomizerLifecycleEventsApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {

    console.log(`LCEVENT:onInit=${window.location.href}`);

    if (!(window as any).isNavigatedEventSubscribed) {

      this.context.application.navigatedEvent.add(this, this.logNavigatedEvent);

      (window as any).isNavigatedEventSubscribed = true;
    }

    return Promise.resolve();
  }

  @override
  public onDispose(): Promise<void> {

    console.log(`LCEVENT:onDispose=${window.location.href}`);

    this.context.application.navigatedEvent.remove(this, this.logNavigatedEvent);

    (window as any).isNavigatedEventSubscribed = false;
    (window as any).currentPage = '';

    return Promise.resolve();
  }

  public logNavigatedEvent(args: SPEventArgs): void {

    setTimeout(() => {

      if ((window as any).currentPage !== window.location.href) {

        // REGISTER PAGE VIEW HERE >>>
        console.log(`LCEVENT:navigatedEvent=${window.location.href}`);

        (window as any).currentPage = window.location.href;
      }
    }, 3000);
  }
}
