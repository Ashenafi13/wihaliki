import { Component, OnInit } from '@angular/core';
import { SeasonService } from './season.service';

declare var cuteAlert: any;

interface ItemData {
  id: string;
  season: string;
  numberOfEpisodes: number;
  status: any;
  SId: number;
}
@Component({
  selector: 'app-app-season-page',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.scss']
})
export class SeasonComponent implements OnInit {
  listOfData: ItemData[] = [];
  seasonName: string;
  episodeName: string;
  startTime: number;
  episodeNameEdit: string;
  startTimeEdit: number;
  isEditable: boolean;
  editId: any;
  _editId: string | null = null;
  public isCollapsed: boolean;
  episodes: any[] = [];
  i = 0;
  selectedSId: number;
  indexTracker: number = 0;
  constructor(private service: SeasonService) { }
  ngOnInit() {
    this.isCollapsed = true;
    this.GetSeasons();
  }
  stopEdit(): void {
    this._editId = null;
  }
  startEdit(id: string): void {
    this._editId = id;
  }
  Alert(type: string, title: string, msg: string): void {
    cuteAlert({
      type: type,
      title: title,
      message: msg,
      buttonText: "እሺ"
    });
  }

  expandSet = new Set<number>();
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.selectedSId = id;
      this.expandSet.clear();
      this.expandSet.add(id);
      this.GetEpisodes(id);
    } else {
      this.expandSet.delete(id);
    }
  }
  edit(index: any): void {
    this.isEditable = true;
    this.indexTracker = index;
    let edit = this.episodes[index];
    this.episodeNameEdit = edit.name;
    this.startTimeEdit = edit.startTime;
    this.editId = edit.id;
  }
  cancel() {

  }
  confirm(id: any) {
    this.ActiveSeasonEpisode(this.selectedSId, id);
  }

  updateSeason(Id: any, name: any) {
    let data = {
      name: name,
    }
    this.service.updateSeason(Id, data).subscribe((re: any) => {
      if (re == 1) {
        this.Alert('success', 'ማስታወቂያ!', 'በተሳካ ሁኔታ ተዘምኗል።');
        this.GetSeasons();
        this.stopEdit();
      } else if (re == 2) {
        this.Alert('error', 'ማስታወቂያ!', 'መረጃው ከዚህ በፊት ተጨምሯል።');
      } else {
        this.Alert('error', 'ማስታወቂያ!', 'የሆነ ነገር ተከስቷል እባክዎ እንደገና ይሞክሩ።');
      }
    })
  }

  confirmSeason(seasonId: any, data: any) {
    if (data.season) {
      this.updateSeason(seasonId, data.season);
    } else {

      this.Alert('error', 'ማስታወቂያ!', 'መረጃው ባዶ ሊሆን አይችልም።');
    }
  }

  ActiveSeasonEpisode(season_Id: any, episode_Id: any): void {
    this.service.ActiveSeasonEpisode(episode_Id, season_Id).subscribe((res: any) => {
      if (res == 1) {
        this.Alert('success', 'ማስታወቂያ!', 'በተሳካ ሁኔታ ተዘምኗል።');
        this.GetEpisodes(this.selectedSId);
      } else {
        this.Alert('error', 'ማስታወቂያ!', 'የሆነ ነገር ተከስቷል እባክዎ እንደገና ይሞክሩ።');
      }
    });
  }

  UpdateEpisode(): void {
    let data = {
      name: this.episodeNameEdit,
      startTime: this.startTimeEdit,
      season_Id: this.selectedSId
    }

    if (this.episodeNameEdit && this.startTimeEdit) {
      this.service.UpdateEpisode(this.editId, data).subscribe((result: any) => {
        if (result == 1) {
          this.Alert('success', 'ማስታወቂያ!', 'በተሳካ ሁኔታ ተዘምኗል።');
          this.isEditable = false;
          this.GetEpisodes(this.selectedSId);
        } else if (result == 2) {
          this.Alert('error', 'ማስታወቂያ!', 'መረጃው ከዚህ በፊት ተጨምሯል።');
        } else {
          this.Alert('error', 'ማስታወቂያ!', 'የሆነ ነገር ተከስቷል እባክዎ እንደገና ይሞክሩ።');
        }

      });
    } else {
      this.Alert('error', 'ማስታወቂያ!', 'መረጃው ባዶ ሊሆን አይችልም።');
    }
  }

  SetRow(data: any): void {
    this.listOfData = [
      ...this.listOfData,
      {
        id: `${this.i}`,
        season: data.season,
        numberOfEpisodes: data.numberOfEpisodes,
        status: data.status,
        SId: data.SId,
      },
    ];
    this.i++;
  }

  GetSeasons(): void {
    this.listOfData = [];
    this.service.GetSeasons().subscribe((result: any) => {

      for (var i = 0; i < result.length; i++) {

        this.SetRow(result[i]);
      }

    });
  }

  AddEpisodes(): void {
    let data = {
      name: this.episodeName,
      startTime: this.startTime,
      season_Id: this.selectedSId
    }
    this.service.AddEpisodes(data).subscribe((r) => {
      if (r == 1) {
        this.Alert('success', 'ማስታወቂያ!', 'በተሳካ ሁኔታ ተጨምሯል።');
        this.episodeName = '';
        this.startTime = null;
        this.GetEpisodes(this.selectedSId);
        this.GetSeasons();
      } else {
        this.Alert('error', 'ማስታወቂያ!', 'እንደገና መጨመር አይችሉም');
      }


    });

  }

  GetEpisodes(season_Id: any): void {
    this.episodes = [];
    this.service.GetEpisodes(season_Id).subscribe((result: any) => {
      if (result.length > 0) {
        this.episodes = result;
      }
    });
  }
  AddSeason(): void {
    let data = {
      name: this.seasonName
    }
    this.service.AddSeason(data).subscribe((response: any) => {
      if (response == 1) {
        this.seasonName = '';
        this.Alert('success', 'ማስታወቂያ!', 'በተሳካ ሁኔታ ተጨምሯል።');
        this.GetSeasons();
      } else {
        this.Alert('error', 'ማስታወቂያ!', 'እንደገና መጨመር አይችሉም');
      }
    });

  }



}
