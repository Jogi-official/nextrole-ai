
from utils.jobs_api import fetch_jobs


def main():
    jobs = fetch_jobs("python", 5)
    print(jobs)
    # for job in jobs:
    #     print(f"{job['title']} - {job['company']}")
    #     print(f"Location: {job['location']}")
    #     print(f"Apply: {job['url']}")
    #     print("-" * 40)


if __name__ == "__main__":
    main()
