# -*- coding: utf-8 -*-
import os
import json
from datetime import datetime, timezone, timedelta
import openpyxl

EXCEL_PATH = "/Users/hungnpv/Downloads/Sunext/VFF/2210/BAO_CAO_TONG_HOP_WARROOM_BAU_CU_VFF_22_10_2026.xlsx"
OUT_DIR = "/Users/hungnpv/Downloads/Sunext/VFF/warroom-dashboard/data"
os.makedirs(OUT_DIR, exist_ok=True)

VN_TZ = timezone(timedelta(hours=7))
now_str = datetime.now(VN_TZ).strftime("%d/%m/%Y %H:%M:%S GMT+7")
excel_mtime_str = datetime.fromtimestamp(os.path.getmtime(EXCEL_PATH), VN_TZ).strftime("%d/%m/%Y %H:%M:%S GMT+7")

wb = openpyxl.load_workbook(EXCEL_PATH, data_only=True)

def read_sheet_rows(ws, start_row=4):
    rows = []
    headers = [str(ws.cell(3, c).value or f"col_{c}").strip() for c in range(1, ws.max_column + 1)]
    for r in range(start_row, ws.max_row + 1):
        vals = [ws.cell(r, c).value for c in range(1, ws.max_column + 1)]
        if all(v is None for v in vals):
            continue
        item = {}
        for idx, h in enumerate(headers):
            item[f"c{idx+1}"] = vals[idx] if vals[idx] is not None else ""
        rows.append(item)
    return headers, rows

db = {
    "meta": {
        "title": "VFF ELECTION SENTIMENT & MEDIA WAR ROOM — ĐẠI HỘI VFF KHÓA X (2026–2030)",
        "subtitle": "Hệ thống Giám sát Dư luận Công khai, Độ phủ Truyền thông & Theo dõi Quy trình Đại biểu (Snapshot chốt kỳ: 01/10 – 22/10/2026)",
        "data_mode": "SNAPSHOT_FROZEN",
        "snapshot_cutoff": "22/10/2026 23:59 GMT+7",
        "updated_at": "22/10/2026 23:59 GMT+7 (Snapshot cố định)",
        "last_synced_at": now_str,
        "excel_file_mtime": excel_mtime_str,
        "official_race_call": "NO_RACE_CALL — Chưa bỏ phiếu chính thức (1.414 tín hiệu là bình luận công khai mã hóa, không phải phiếu Đại biểu VFF)",
        "congress_date": "Quý IV/2026 – Quý I/2027 (Theo lộ trình Đại hội VFF Khóa X)",
        "total_clickable_links": 2951,
        "kpis": {
            "verified_posts_videos": 974,
            "catalog_posts_videos": 1197,
            "press_articles": 78,
            "fb_catalog_channels": 378,
            "fb_active_pages": 381,
            "fb_catalog_posts": 888,
            "fb_verified_posts": 665,
            "fb_reactions": 223497,
            "fb_comments_raw": 10133,
            "fb_unique_users": 8693,
            "fb_election_comments": 887,
            "fb_election_votes_merged": 972,
            "yt_videos": 169,
            "yt_views": 5066831,
            "yt_duration_hours": 52.05,
            "yt_script_lines": 82549,
            "yt_script_words": 683365,
            "yt_comments_downloaded": 4182,
            "yt_election_votes": 398,
            "tt_videos": 68,
            "tt_script_videos": 62,
            "tt_views": 2825617,
            "tt_likes": 59442,
            "tt_shares": 3399,
            "tt_platform_comments": 2426,
            "tt_inwindow_comments": 154,
            "tt_script_lines": 2825,
            "tt_election_votes": 44,
            "yttt_coded_election_comments": 604,
            "yttt_stance_comments": 381,
            "total_video_views": 7892448,
            "total_asr_lines": 85374,
            "total_comments_collected": 14469,
            "october_comments": 10514,
            "direct_election_votes": 1414
        },
        "candidates": {
            "tuan": {
                "name": "TS. Trần Quốc Tuấn",
                "role": "Chủ tịch VFF đương nhiệm • Ủy viên Thường vụ AFC",
                "color": "#1560D4",
                "mentions_22d": 596,
                "positive_posts": 433,
                "negative_posts": 12,
                "direct_votes": 465,
                "coalition_lead_votes": 121,
                "total_leader_votes": 586,
                "leader_vote_pct_all": 41.4,
                "leader_vote_pct_h2h": 59.1,
                "direct_oppose_comments": 112,
                "oppose_both_comments": 101,
                "total_negative_comments": 213,
                "subordinate_coalition_comments": 93,
                "net_combined": 794,
                "net_comments": 373,
                "nsi_combined": 63.8,
                "nsi_comments": 46.7
            },
            "thuy": {
                "name": "Ông Nguyễn Đức Thụy (Bầu Thụy)",
                "role": "Ứng viên Doanh nhân • Chủ tịch HĐQT LPBank",
                "color": "#D62728",
                "mentions_22d": 454,
                "positive_posts": 316,
                "negative_posts": 42,
                "direct_votes": 312,
                "coalition_lead_votes": 93,
                "total_leader_votes": 405,
                "leader_vote_pct_all": 28.6,
                "leader_vote_pct_h2h": 40.9,
                "direct_oppose_comments": 210,
                "oppose_both_comments": 101,
                "total_negative_comments": 311,
                "subordinate_coalition_comments": 121,
                "net_combined": 368,
                "net_comments": 94,
                "nsi_combined": 34.3,
                "nsi_comments": 13.1
            },
            "vu": {
                "name": "Ông Nguyễn Xuân Vũ",
                "role": "Phó Chủ tịch HĐQT Sacombank • Chủ tịch CLB Xuân Thiện Phú Thọ",
                "color": "#E67E22",
                "mentions_22d": 119,
                "positive_posts": 28,
                "negative_posts": 1,
                "direct_votes": 4,
                "coalition_votes": 18,
                "direct_oppose_comments": 6,
                "net_combined": 43,
                "net_comments": 16,
                "nsi_combined": 60.6
            }
        }
    },
    "sheets": {}
}

for sn in wb.sheetnames:
    ws = wb[sn]
    hdrs, rows = read_sheet_rows(ws, start_row=4)
    db["sheets"][sn] = {
        "title": str(ws.cell(1, 1).value or sn),
        "subtitle": str(ws.cell(2, 1).value or ""),
        "headers": hdrs,
        "count": len(rows),
        "rows": rows
    }

wb.close()

out_json = os.path.join(OUT_DIR, "warroom_db.json")
with open(out_json, "w", encoding="utf-8") as f:
    json.dump(db, f, ensure_ascii=False, separators=(",", ":"))

print(f"Exported warroom_db.json ({os.path.getsize(out_json)/1024:.1f} KB) with {len(db['sheets'])} sheets.")
for sn, info in db["sheets"].items():
    print(f"  - {sn}: {info['count']} rows")
