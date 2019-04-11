import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@sunbird/core';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { SharedModule } from '@sunbird/shared';
import { SuiModule } from 'ng2-semantic-ui/dist';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { WorkSpaceService, EditorService , BatchService, ReviewCommentsService} from './services';
import {
  WorkspaceComponent, CreateContentComponent, DraftComponent,
  ReviewSubmissionsComponent, PublishedComponent, UploadedComponent,
  CollectionEditorComponent, ContentEditorComponent, GenericEditorComponent,
  WorkspacesidebarComponent, DataDrivenComponent, DefaultTemplateComponent,
  FlaggedComponent, UpForReviewComponent, UpforReviewFilterComponent,
  BatchListComponent, BatchCardComponent, UpdateBatchComponent,
  UpforreviewContentplayerComponent, FlagConentplayerComponent, ReviewsubmissionsContentplayerComponent,
  PublishedPopupComponent, RequestChangesPopupComponent, LimitedPublishedComponent,
  AllContentComponent, FlagReviewerComponent, AllMyContentFilterComponent, CollaboratingOnComponent,
  CollaborationContentFilterComponent
} from './components';
import { NgInviewModule } from 'angular-inport';
import { TelemetryModule } from '@sunbird/telemetry';
import { ReviewCommentsComponent } from './components/review-comments/review-comments.component';
import { OrderModule } from 'ngx-order-pipe';
import { CreateAssetComponent } from './components/create-asset/create-asset.component';
import { UpdateResoureFormComponent } from './components/update-resoure-form/update-resoure-form.component';
import { MyassestPageComponent } from './components/myassest-page/myassest-page.component';
import { AssetDetailPageComponent } from './components/asset-detail-page/asset-detail-page.component';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
// import { AdduserComponent } from './components/adduser/adduser.component';
@NgModule({
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    SharedModule,
    SuiModule,
    FormsModule,
    CoreModule,
    ReactiveFormsModule,
    NgInviewModule,
    TelemetryModule,
    OrderModule
  ],
  declarations: [WorkspaceComponent, WorkspacesidebarComponent,
    CreateContentComponent, DraftComponent, ReviewSubmissionsComponent,
    PublishedComponent, UploadedComponent, CollectionEditorComponent,
    ContentEditorComponent, GenericEditorComponent, UpForReviewComponent, UpforReviewFilterComponent,
    DataDrivenComponent, UpForReviewComponent, UpforReviewFilterComponent, DefaultTemplateComponent,
    FlaggedComponent, BatchListComponent, BatchCardComponent, UpdateBatchComponent, UpforreviewContentplayerComponent,
    FlagConentplayerComponent,
    ReviewsubmissionsContentplayerComponent,
    PublishedPopupComponent,
    RequestChangesPopupComponent,
    LimitedPublishedComponent,
    AllContentComponent,
    FlagReviewerComponent,
    AllMyContentFilterComponent,
    CollaboratingOnComponent,
    CollaborationContentFilterComponent,
    ReviewCommentsComponent,
    CollaborationContentFilterComponent,
    CreateAssetComponent,
    UpdateResoureFormComponent,
    MyassestPageComponent,
    AssetDetailPageComponent,
    PdfViewerComponent,
  ],
  providers: [WorkSpaceService, EditorService, BatchService, ReviewCommentsService],
  exports: [CreateAssetComponent, DataDrivenComponent, DefaultTemplateComponent, CreateContentComponent]
})
export class WorkspaceModule { }
