﻿using System;
using System.Collections.Generic;

namespace Infrastructure.Entities;

public partial class BranchReply
{
    public Guid Id { get; set; }

    public Guid? ReportContentsId { get; set; }

    public string? CreatedBy { get; set; }

    public string? ActionPlan { get; set; }

    public DateTime? DateCreated { get; set; }

    public string? ExceptionNo { get; set; }
}